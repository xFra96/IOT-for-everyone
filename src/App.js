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

  useEffect(() => {
    setup()
  }, [])


  return (
    <>
      {loading &&
        <div id="loading">
          {message}
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      }
      <div className="container-fluid text-center">
        <div className="row mb-4">
          <div className="col-lg-12 col-md-12">
            <h3 >IOT For Everyone</h3>
          </div>
        </div>
        <div className="row">
          <Webcam />
          <Phrase />
        </div>
      </div>
    </>
  )
}
export default App;