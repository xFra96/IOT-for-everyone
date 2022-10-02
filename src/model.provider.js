import React, { useState, useContext, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import datasetRaw from "./dataset.json"

export const AppContext = React.createContext(null)

export default function FunctionsProvider(props) {
    const [application, setApplication] = useState({
        model: null,
        classifier: null,
        webcam: null,
    });
    const [interval, setIntervalID] = useState(null);
    const [phrase, setPhrase] = useState("");

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
                    if (match.label === "space") {
                        let new_phrase = phrase + " "
                        setPhrase(new_phrase)
                    } else {
                        let new_phrase = phrase + match.label
                        setPhrase(new_phrase)
                    }
                }
            }
        }, 2000)
        return intervalID
    }

    const actionsHandler = () => {
        if (interval) {
            clearInterval(interval)
            setIntervalID(null)
            return
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
    const deleteAll = () => {
        setPhrase("")
    };

    const deleteLastDigit = () => {
        let new_phrase = phrase.substring(0, phrase.length - 1);
        setPhrase(new_phrase)
    };

    //Packaging
    const values = {
        interval,
        phrase,
        deleteAll,
        setup,
        deleteLastDigit,
        actionsHandler,
    }

    return (
        <AppContext.Provider key="context" value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const value = useContext(AppContext)
    return value
}