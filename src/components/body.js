import React, { useState } from 'react'
import Phrase from './phrase'
import Webcam from './webcam';

const AppBody = ({ webcam, classifier, handpose, tf }) => {
    const [interval, setIntervalID] = useState(null);
    const [guessing_status, setGuessStatus] = useState("OFF");
    const [hint1, setHint1] = useState("Premere START per iniziare a individuare i segni");
    const [hint2, setHint2] = useState("");
    const [hint3, setHint3] = useState("");
    const [phrase, setPhrase] = useState("");

    //Guesser
    const guess = () => {
        let intervalID = setInterval(async () => {
            const predictions = await handpose.estimateHands(webcam);
            if (predictions.length > 0) {
                hintsVisibility(false)
                for (let i = 0; i < predictions.length; i++) {
                    const keypoints = predictions[i].landmarks;
                    let tensor = tf.tensor(keypoints);
                    const match = await classifier.predictClass(tensor);
                    let new_phrase = phraseHandler(match.label)
                    setPhrase(new_phrase)
                }
            } else {
                hintsVisibility(true)
            }
        }, 2000)
        return intervalID
    }
    const startGuessing = () => {
        hintsVisibility(false)
        if (interval == null) {
            const numClasses = classifier.getNumClasses();
            if (numClasses > 0) {
                let intervalID = guess()
                setIntervalID(intervalID)
                setGuessStatus("ON")
            } else {
                alert("Non ci sono classi nel classifier !")
            }
        }
    };
    const stopGuessing = () => {
        hintsVisibility(false)
        clearInterval(interval)
        setIntervalID(null)
        setHint1("Premere START per iniziare a individuare i segni")
        setGuessStatus("OFF")
        console.log(phrase)
    };

    //Utilitites della frase
    const phraseHandler = (new_digit) => {
        let new_phrase
        if (phrase === "") {
            if (new_digit !== "space") {
                new_phrase = new_digit
            }
        } else {
            if (new_digit === "space") {
                new_phrase = phrase + ' '
            } else {
                new_phrase = phrase + new_digit
            }
        }
        return new_phrase
    }
    const deleteAll = () => {
        setPhrase("")
    };
    const deleteLastDigit = () => {
        let new_phrase = phrase.substring(0, phrase.length - 1);
        setPhrase(new_phrase)
    };

    //Hints
    const hintsVisibility = (status) => {
        if (status) {
            setTimeout(() => {
                setHint1("Non sto rilevando nulla.")
                setHint2("Avvicina e centra la mano nel cerchio verde per maggior precisione")
                setHint3("Assicurati che le condizioni di luce siano buone")
            }, 4000)
        } else {
            setHint1("")
            setHint2("")
            setHint3("")
        }
    }

    return (
        <div className="row">
            <Webcam startGuessing={startGuessing} stopGuessing={stopGuessing} guessing_status={guessing_status} />
            <Phrase hint1={hint1} hint2={hint2} hint3={hint3} phrase={phrase} deleteLastDigit={deleteLastDigit} deleteAll={deleteAll} />
        </div>
    )
}

export default AppBody