import React, { useState, useContext, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import datasetRaw from "./dataset.json"

export const ModelContext = React.createContext(null)

export default function ModelProvider(props) {
    const [application, setApplication] = useState({
        model: null,
        classifier: null,
        webcam: null,
    });
    const [interval, setIntervalID] = useState(null);
    const [current_letter, setCurrentLetter] = useState("");
    const [current_word, setCurrentWord] = useState("");

    //Initizializzazione sistema
    const setup = async () => {
        console.log("Initializing model... ")
        const handPoseModel = await handpose.load();
        console.log("Initializing webcam... ")
        const videoSource = document.getElementById('webcam');
        await tf.data.webcam(videoSource);
        console.log("Initializing classifier... ")
        const knn = knnClassifier.create();
        if (Object.keys(datasetRaw).length > 0) {
            console.log("Dataset trovato, importo i dati nel classifier")
            datasetRaw.forEach(el => {
                let tensor = tf.tensor(el.keypoints);
                knn.addExample(tensor, el.label);
            })
            let total = knn.getNumClasses()
            console.log("Dataset importato con successo, trovate " + total + " classi")
        } else {
            alert("Dataset non valido e/o vuoto ! Inserire un dataset valido")
            return
        }
        setApplication({
            model: handPoseModel,
            classifier: knn,
            webcam: videoSource,
        })
        console.log("Ready !")
    }

    //Guesser
    const guess = () => {
        let intervalID = setInterval(async () => {
            const { model, webcam, classifier } = application
            const predictions = await model.estimateHands(webcam);
            if (predictions.length > 0) {
                for (let i = 0; i < predictions.length; i++) {
                    const keypoints = predictions[i].landmarks;
                    let tensor = tf.tensor(keypoints);
                    const match = await classifier.predictClass(tensor);
                    console.log(match)
                    setCurrentLetter(match.label)
                }
            }
        }, 1500)
        return intervalID
    }

    const startGuessing = () => {
        if (interval) {
            stopAction()
        }
        const numClasses = application.classifier.getNumClasses();
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
        if (current_letter === "space") {
            let word = current_word + " "
            setCurrentWord(word)
        } else {
            let word = current_word + current_letter
            setCurrentWord(word)
        }
    }, [current_letter])


    //Packaging
    const values = {
        interval,
        current_word,
        deleteWord,
        setup,
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