//Import moduli principali
import React, { useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
//Import Dataset
import datasetRaw from "./dataset.json"
//Import Webcam 
import Video from './components/video'
import Text from './components/text';
const App = () => {
  const [application, setApplication] = useState({
    model: null,
    classifier: null,
    loading: true
  });
  const [phrase, setPhrase] = useState("");

  //Utilitites della frase
  const deleteAll = () => {
    setPhrase("")
  };

  const deleteLastDigit = () => {
    setPhrase(prev_phrase => {
      let new_phrase = prev_phrase.substring(0, prev_phrase.length - 1);
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
          <Video setPhrase={setPhrase} handpose={application.model} classifier={application.classifier} tf={tf} />
          <Text phrase={phrase} deleteLastDigit={deleteLastDigit} deleteAll={deleteAll} />
        </div>
      </div>
    </>
  )
}
export default App;