import { useAppContext } from '../model.provider'

export const Webcam = () => {
    const { actionsHandler, interval } = useAppContext()
    return (
        <div className="col-lg-6 col-md-12">
            <p className='fs-5'><b>DETECTION: <span className={interval ? "text-success" : "text-danger"}>{interval ? "ON" : "OFF"}</span></b></p>
            <div className="circle">
                <video autoPlay playsInline muted id="webcam" width="650" height="650"></video>
            </div>
            <div className="mt-3">
                {!interval && <p className="mb-1"><i>Premere START per iniziare a individuare i segni</i></p>}
                <h6 className="mb-3">Centra la mano nel cerchio verde per maggior precisione nella detection della posa</h6>
                <button type="button" onClick={() => { actionsHandler() }} className="btn btn-outline-info w-100">START / STOP</button>
            </div>
        </div >
    )
}