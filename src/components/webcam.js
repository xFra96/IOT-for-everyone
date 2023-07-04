import { useAppContext } from "../functions.provider";

export default function Webcam() {
  const { actionsHandler, interval } = useAppContext();
  return (
    <div className="col-lg-6 col-md-12">
      <p className="fs-5">
        <b>
          STATUS:{" "}
          <span className={interval ? "text-success" : "text-danger"}>
            {interval ? "ON" : "OFF"}
          </span>
        </b>
      </p>
      <div className="circle">
        <video
          autoPlay
          playsInline
          muted
          id="webcam"
          width="650"
          height="650"
        ></video>
      </div>
      <div className="mt-3">
        {interval ? (
          <h6 className="mb-3">
            Centra la mano nel cerchio verde per maggior precisione
          </h6>
        ) : (
          <p className="mb-3">
            <i>
              Premere il pulsante sottostante per iniziare a individuare i segni
            </i>
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            actionsHandler();
          }}
          className={`btn mx-3 ${interval ? "btn-danger" : "btn-success"}`}
        >
          {interval ? "STOP" : "START"}
        </button>
      </div>
    </div>
  );
}
