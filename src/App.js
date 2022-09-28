//Import moduli principali
import React, { useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
//Import Dataset
import datasetRaw from "./dataset.json"
//Import Video e Text (componenti)
import VideoComponent from './components/video'
import TextComponent from './components/text';

const App = () => {
  const [application, setApplication] = useState({
    model: null,
    classifier: null,
    loading: true
  });
  const [phrase, setPhrase] = useState("");

  //Utilitites della frase
  const deletePhrase = () => {
    setPhrase("")
  };

  const deleteLastDigit = () => {
    setPhrase(actual_phrase => {
      let new_phrase = actual_phrase.substring(0, actual_phrase.length - 1);
      return new_phrase
    })
  };

  //Init del sistema
  useEffect(() => {
    //Inizializzazione sistema
    const setup = async () => {
      console.log("Initializing model... ")
      const handPoseModel = await handpose.load();
      console.log("Initializing classifier... ")
      const knn = knnClassifier.create();
      if (Object.keys(datasetRaw).length > 0) {
        datasetRaw.forEach(el => {
          let tensor = tf.tensor(el.keypoints);
          knn.addExample(tensor, el.label);
        })
        let total = knn.getNumClasses()
        console.log("Dataset importato con successo, trovate " + total + " classi")
      } else {
        alert("Dataset non valido e/o vuoto ! Inserire un dataset valido")
      }
      setApplication({
        model: handPoseModel,
        classifier: knn,
        loading: false
      })
      console.log("Ready !")
    }
    setup()
  }, [])

  return (
    <>
      {application.loading &&
        <div id="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      }
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-lg-12 col-md-12 mb-4">
            <h3 className="text-center">IOT 4 Everyone</h3>
          </div>
        </div>
        <div className="row">
          <VideoComponent
            setPhrase={setPhrase}
            handpose={application.model}
            classifier={application.classifier}
            tf={tf}
          />
          <TextComponent
            phrase={phrase}
            deleteLastDigit={deleteLastDigit}
            deletePhrase={deletePhrase}
          />
        </div>
      </div>
    </>
  )
}
export default App;