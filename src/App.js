//Import moduli principali
import React, { useState, useEffect } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
//Import Dataset
import datasetRaw from "./dataset.json"
//Import componenti
import Webcam from './components/webcam'

const App = () => {
  const [loading, setLoading] = useState(false);
  const [webcam, setWebcam] = useState(null);
  const [message, setMessage] = useState("");
  const [model, setModel] = useState(null);
  const [classifier, setClassifier] = useState(null);

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
      setMessage("Dataset trovato, importo i dati nel classificatore..")
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

  useEffect(() => {
    let loader = document.querySelector("#loading")
    loader.style.display = loading ? "flex" : "none"
  }, [loading])

  useEffect(() => {
    setup()
  }, [])

  return (
    <>
      <div id="loading">
        {message}
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row mb-4">
          <div className="col-lg-12 col-md-12">
            <h3 className="text-center">IOT For Everyone</h3>
          </div>
        </div>
        <Webcam webcam={webcam} handpose={model} classifier={classifier} tf={tf} />
      </div>
    </>
  )
}
export default App;