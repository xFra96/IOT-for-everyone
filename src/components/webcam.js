const Webcam = ({ guessing_status, startGuessing, stopGuessing }) => {
    return (
        <div className="col-lg-6 col-md-12">
            <p className='fs-5'><b>GUESSING STATUS: <span className={guessing_status === "OFF" ? "text-danger" : "text-success"}>{guessing_status}</span></b></p>
            <div className="circle">
                <video autoPlay playsInline muted id="webcam" className='shadow' width="650" height="650"></video>
            </div>
            <div className="mt-3">
                <button type="button" onClick={() => { startGuessing() }} className="btn btn-success mx-3 shadow">START</button>
                <button type="button" onClick={() => { stopGuessing() }} className="btn btn-danger mx-3 shadow">STOP</button>
                <a href="https://www.spreadthesign.com/it.it/alphabet/6/" rel="noreferrer" className="mt-3 w-100 text-center d-block" target="_blank">Esempi</a>
            </div>
        </div>
    )
}

export default Webcam