import React, { useState } from 'react'
import Phrase from './phrase'

const Webcam = ({ webcam, classifier, handpose, tf }) => {
    const [interval, setIntervalID] = useState(null);
    const [status, setStatus] = useState("OFF");
    const [hint1, setHint1] = useState("Premere START per iniziare a individuare i segni");
    const [hint2, setHint2] = useState("");
    const [hint3, setHint3] = useState("");
    const [current_word, setCurrentWord] = useState("");

    //Guesser
    const guess = () => {
        let intervalID = setInterval(async () => {
            const predictions = await handpose.estimateHands(webcam);
            if (predictions.length > 0) {
                setHint1("")
                setHint2("")
                setHint3("")
                for (let i = 0; i < predictions.length; i++) {
                    const keypoints = predictions[i].landmarks;
                    let tensor = tf.tensor(keypoints);
                    const match = await classifier.predictClass(tensor);
                    console.log(match)
                    let word = current_word
                    if (match.label === "space") {
                        setCurrentWord(word + " ")
                    } else {
                        setCurrentWord(word + match.label)
                    }
                }
            } else {
                console.log(predictions)
                setHint1("Non sto rilevando nulla.")
                setHint2("Avvicina e centra la mano nel cerchio verde per maggior precisione")
                setHint3("Assicurati che le condizioni di luce siano buone")
            }
        }, 1500)
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
            setStatus("ON")
        } else {
            alert("Non ci sono classi nel classifier !")
        }
    };

    //Utilities
    const stopAction = () => {
        clearInterval(interval)
        setIntervalID(null)
        setHint1("Premere START per iniziare a individuare i segni")
        setHint2("")
        setHint3("")
        setStatus("OFF")
    };

    const deleteWord = () => {
        setCurrentWord("")
    };

    const deleteLastDigit = () => {
        let word = current_word.substring(0, current_word.length - 1);
        setCurrentWord(word)
    };

    return (
        <div className="row">
            <div className="col-lg-6 col-md-12">
                <p className='fs-5'><b>GUESSING STATUS:</b> <span className={status === "OFF" ? "text-danger" : "text-success"}>{status}</span></p>
                <div className="circle">
                    <video autoPlay playsInline muted id="webcam" className='shadow' width="650" height="650"></video>
                </div>
                <div className="mt-3">
                    <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3 shadow">START</button>
                    <button type="button" onClick={() => { stopAction() }} className="btn btn-danger mx-3 shadow">STOP</button>
                    <a href="https://www.spreadthesign.com/it.it/alphabet/6/" rel="noreferrer" className="mt-3 w-100 text-center d-block" target="_blank">Esempi</a>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <Phrase hint1={hint1} hint2={hint2} hint3={hint3} current_word={current_word} deleteLastDigit={deleteLastDigit} deleteWord={deleteWord} />
            </div>
        </div>
    )
}

export default Webcam