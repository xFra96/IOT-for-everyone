import Speaker from './speaker';

const Phrase = ({ deleteAll, deleteLastDigit, phrase, hint1, hint2, hint3 }) => {
    return (
        <div className="col-lg-6 col-md-12">
            <div className="textcontainer">
                <p>{phrase}</p>
            </div>
            <div className="mt-2">
                <p className="mb-1 f-7"><b>{hint1}</b></p>
                <p>{hint2}<br />{hint3}</p>
            </div>
            <div className="my-1">
                <button type="button" onClick={() => { deleteLastDigit() }} className="btn btn-warning mx-3 shadow">BACKSPACE</button>
                <button type="button" onClick={() => { deleteAll() }} className="btn btn-warning mx-3 shadow">DELETE</button>
            </div>
            <div className="row">
                <Speaker phrase={phrase} />
            </div>
        </div>
    )
}

export default Phrase