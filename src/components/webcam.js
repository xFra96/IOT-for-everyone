import { useAppContext } from '../misc/model.provider'

const Webcam = () => {
    const { startGuessing, stopAction, interval } = useAppContext()

    return (
        <div className="col-lg-6 col-md-12">
            <p className='fs-5'><b>STATUS: <span className={interval ? "text-success" : "text-danger"}>{interval ? "ON" : "OFF"}</span></b></p>
            <div className="circle">
                <video autoPlay playsInline muted id="webcam" width="650" height="650"></video>
            </div>
            <div className="mt-3">
                {!interval && <p className="mb-1"><i>Premere START per iniziare a individuare i segni</i></p>}
                <h6 className="mb-3">Centra la mano nel cerchio verde per maggior precisione</h6>
                <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3">START</button>
                <button type="button" onClick={() => { stopAction() }} className="btn btn-danger mx-3">STOP</button>
            </div>
        </div >
    )
}

export default Webcam