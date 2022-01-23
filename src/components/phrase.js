import React from 'react'
import Speaker from './speaker';

const Phrase = ({ deleteWord, deleteLastDigit, current_word, hint1, hint2, hint3 }) => {
    return (
        <>
            <div className="textcontainer">
                <p>{current_word}</p>
            </div>
            <div className="mt-2">
                <p className="mb-1 f-7"><b>{hint1}</b></p>
                <p>{hint2}<br />{hint3}</p>
            </div>
            <div className="my-1">
                <button type="button" onClick={() => { deleteLastDigit() }} className="btn btn-warning mx-3 shadow">BACKSPACE</button>
                <button type="button" onClick={() => { deleteWord() }} className="btn btn-warning mx-3 shadow">DELETE</button>
            </div>
            <div className="row">
                <Speaker current_word={current_word} />
            </div>
        </>
    )
}

export default Phrase