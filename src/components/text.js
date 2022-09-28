import Speaker from './speaker';

const TextComponent = ({ deletePhrase, deleteLastDigit, phrase }) => {
    return (
        <div className="col-lg-6 col-md-12">
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="textcontainer">
                        <p>{phrase}</p>
                    </div>
                    <div className="my-1">
                        <button type="button" onClick={() => { deleteLastDigit() }} className="btn btn-warning mx-3 shadow">BACKSPACE</button>
                        <button type="button" onClick={() => { deletePhrase() }} className="btn btn-warning mx-3 shadow">DELETE</button>
                    </div>
                </div>
            </div>
            <Speaker phrase={phrase} />
        </div>
    )
}

export default TextComponent