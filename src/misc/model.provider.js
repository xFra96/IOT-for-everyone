import React, { useState, useContext, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import datasetRaw from "../dataset.json"

export const ModelContext = React.createContext(null)

export default function ModelProvider(props) {
    const [model, setModel] = useState(null);
    const [classifier, setClassifier] = useState(null);
    const [loading, setLoading] = useState(false);
    const [webcam, setWebcam] = useState(null);
    const [message, setMessage] = useState("");
    const [interval, setIntervalID] = useState(null);
    const [current_letter, setCurrentLetter] = useState("");
    const [current_word, setCurrentWord] = useState("");

    //Initizializzazione sistema
    const setup = async () => {
        setLoading(true)
        setMessage("Initializing model... ")
        const handPoseModel = await handpose.load();
        setModel(handPoseModel)
        setMessage("Initializing webcam... ")
        const videoSource = document.getElementById('webcam');
        await tf.data.webcam(videoSource);
        setWebcam(videoSource)
        setMessage("Initializing classifier... ")
        const knn = knnClassifier.create();
        setClassifier(knn)
        if (Object.keys(datasetRaw).length > 0) {
            setMessage("Dataset trovato, importo i dati nel classifier")
            datasetRaw.forEach(el => {
                let tensor = tf.tensor(el.keypoints);
                knn.addExample(tensor, el.label);
            })
            let total = knn.getNumClasses()
            console.log("Dataset importato con successo, trovate " + total + " classi")
        } else {
            alert("Dataset non valido e/o vuoto ! Inserire un dataset valido")
        }
        setLoading(false)
        console.log("Ready !")
    }

    //Guesser
    const guess = () => {
        let intervalID = setInterval(async () => {
            const predictions = await model.estimateHands(webcam);
            if (predictions.length > 0) {
                for (let i = 0; i < predictions.length; i++) {
                    const keypoints = predictions[i].landmarks;
                    let tensor = tf.tensor(keypoints);
                    const match = await classifier.predictClass(tensor);
                    console.log("Match found ! ")
                    console.log(match)
                    setCurrentLetter(match.label)
                }
            } else {
                console.log(predictions)
            }
        }, 2000)
        return intervalID
    }

    const startGuessing = () => {
        if (interval) {
            stopAction()
        }
        const numClasses = classifier.getNumClasses();
        if (numClasses > 0) {
            let intervalID = guess()
            setIntervalID(intervalID)
        } else {
            alert("Non ci sono classi nel classifier !")
        }
    };

    //Utilities
    const stopAction = () => {
        clearInterval(interval)
        setIntervalID(null)
    };

    const deleteWord = () => {
        setCurrentWord("")
    };

    const deleteLastDigit = () => {
        let word = current_word.substring(0, current_word.length - 1);
        setCurrentWord(word)
    }; 

    useEffect(() => {
        let word = current_word + current_letter
        setCurrentWord(word)
    }, [current_letter])


    //Packaging
    const values = {
        loading,
        message,
        current_word,
        deleteWord,
        setup,
        setLoading,
        deleteLastDigit,
        startGuessing,
        stopAction,
    }

    return (
        <ModelContext.Provider key="context" value={values}>
            {props.children}
        </ModelContext.Provider>
    )
}

export function useAppContext() {
    const value = useContext(ModelContext)
    return value
}