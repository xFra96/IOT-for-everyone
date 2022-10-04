import { useAppContext } from "../functions.provider";

export default function Phrase() {
  const { current_word, deleteWord, deleteLastDigit } = useAppContext();

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const speak = () => {
    let utterThis = new SpeechSynthesisUtterance(current_word);
    let selectedOption = document
      .querySelector("#selectlingua")
      .selectedOptions[0].getAttribute("value");
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 0.8;
    synth.speak(utterThis);
  };
  return (
    <div className="col-lg-6 col-md-12">
      <div className="textcontainer">
        <p>{current_word}</p>
      </div>
      <div className="row">
        <div className="col-12 mb-4">
          <p>Scegli una voce / Choose Language</p>
          <select
            className="w-50 mx-auto form-select"
            id="selectlingua"
            aria-label="Seleziona lingua"
          >
            {voices.map((el, i) => {
              return (
                <option key={i} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12">
          <button
            type="button"
            onClick={() => {
              deleteLastDigit();
            }}
            className="btn btn-warning mx-3"
          >
            BACKSPACE
          </button>
          <button
            type="button"
            onClick={() => {
              deleteWord();
            }}
            className="btn btn-warning mx-3"
          >
            DELETE
          </button>
        </div>
        <div className="col-12 mt-3">
          <button
            type="button"
            onClick={() => {
              speak();
            }}
            className="w-50 mx-auto btn btn-primary"
          >
            Parla
          </button>
        </div>
      </div>
    </div>
  );
}
