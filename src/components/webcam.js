import { useAppContext } from '../misc/model.provider'

const Webcam = () => {
    const { startGuessing, stopAction, deleteWord } = useAppContext()

    return (
        <>
            <div className="circle">
                <video autoPlay playsInline muted id="webcam" width="650" height="650"></video>
            </div>
            <div className="mt-5">
                <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3">GUESS</button>
                <button type="button" onClick={() => { stopAction() }} className="btn btn-danger mx-3">STOP</button>
                <button type="button" onClick={() => { deleteWord() }} className="btn btn-warning mx-3">DELETE WORD</button>
            </div>

        </>
    )
}

export default Webcam