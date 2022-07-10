import Webcam from "react-webcam";
import React, { useRef, useState } from 'react'

const Video = ({ setPhrase, classifier, handpose, tf }) => {
    const [guessing_status, setGuessStatus] = useState("OFF");
    const [interval, setGuessInterval] = useState(null);
    const webcamRef = useRef(null);

    //Funzione che individua dalla fonte video la mano
    const detect = () => {
        let intervalID = setInterval(async () => {
            // Controllo se la webcam è disponibile e pronta
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState === 4
            ) {
                // Recuper proprietà video della webcam
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                // Setto larghezza e altezza video 
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                let predictions = await handpose.estimateHands(video);
                if (predictions.length > 0) {
                    const keypoints = predictions[0].landmarks;
                    let tensor = tf.tensor(keypoints);
                    const match = await classifier.predictClass(tensor);
                    const new_digit = match.label
                    setPhrase(prev_phrase => {
                        let new_phrase = ""
                        if (prev_phrase === "") {
                            if (new_digit !== "space") {
                                new_phrase = new_digit
                            }
                        } else {
                            if (new_digit === "space") {
                                new_phrase = prev_phrase + " "
                            } else {
                                new_phrase = prev_phrase + new_digit
                            }
                        }
                        return new_phrase
                    })
                }
            }
        }, 2000)
        return intervalID
    }
    //Funzione che setta lo status di detection su on e salva nello stato l'id del processo che lancia ogni 2 secondi la funzione detect()(ogni run prende un frame del video)
    const startGuessing = async () => {
        const numClasses = classifier.getNumClasses();
        if (numClasses > 0) {
            setGuessStatus("ON")
            let intervalID = detect()
            setGuessInterval(intervalID)
        } else {
            alert("Non ci sono classi nel classifier !")
        }
    }
    //Funzione che annulla il processo e termina la detection
    const stopGuessing = () => {
        clearInterval(interval)
        setGuessStatus("OFF")
    };
    return (
        <div className="col-lg-6 col-md-12">
            <p className='fs-5'><b>STATUS: <span className={guessing_status === "OFF" ? "text-danger" : "text-success"}>{guessing_status}</span></b></p>
            <div className="circle">
                <Webcam
                    ref={webcamRef}
                    style={{
                        width: 'auto',
                        height: 'auto',
                        maxWidth: 650,
                        maxHeight: 650,
                    }}
                    className='shadow'
                />
            </div>
            <div className="mt-3">
                <p className="mb-3"><b>Premere START per iniziare a individuare i segni</b></p>
                <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3 shadow">START</button>
                <button type="button" onClick={() => { stopGuessing() }} className="btn btn-danger mx-3 shadow">STOP</button>
                <a href="https://www.spreadthesign.com/it.it/alphabet/6/" rel="noreferrer" className="mt-3 w-100 text-center d-block" target="_blank">Esempi</a>
            </div>
        </div>
    )
}

export default Video