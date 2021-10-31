import { useAppContext } from '../misc/model.provider'

const Webcam = () => {
    const { startGuessing, stopAction, deleteWord, deleteLastDigit } = useAppContext()

    return (
        <>
            <div className="circle">
                <video autoPlay playsInline muted id="webcam" width="650" height="650"></video>
            </div>
            <div className="mt-3">
                <h6 className="mb-3">Centra la mano nel cerchio verde per maggior precisione</h6>
                <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3">START</button>
                <button type="button" onClick={() => { stopAction() }} className="btn btn-danger mx-3">STOP</button>
                <button type="button" onClick={() => { deleteLastDigit() }} className="btn btn-warning mx-3">BACKSPACE</button>
                <button type="button" onClick={() => { deleteWord() }} className="btn btn-warning mx-3">DELETE</button>
                <a href="https://www.spreadthesign.com/it.it/alphabet/6/" className="mt-3 w-100 text-center d-block" target="_blank">Esempi</a>
            </div>

        </>
    )
}

export default Webcam