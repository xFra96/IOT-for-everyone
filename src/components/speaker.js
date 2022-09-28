const SpeakerComponent = ({ current_phrase }) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices()

    const speak = () => {
        let utterThis = new SpeechSynthesisUtterance(current_phrase);
        let selectedOption = document.querySelector("#selectlingua").selectedOptions[0].getAttribute('value');
        for (var i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
            }
        }
        utterThis.pitch = 1;
        utterThis.rate = 0.8;
        synth.speak(utterThis);
    }
    return (
        <div className="row mt-4">
            <div className="col-12">
                <p>Scegli una voce / Choose Language</p>
                <select className="w-50 mx-auto form-select" id="selectlingua" aria-label="Seleziona lingua">
                    {voices.map((el, i) => {
                        return (
                            <option key={i} value={el.name}>{el.name}</option>
                        )
                    }
                    )
                    }
                </select>
            </div>
            <div className="col-12">
                <button className="w-50 mx-auto btn btn-primary" onClick={() => { speak() }}>Parla</button>
            </div>
        </div>
    )
}

export default SpeakerComponent
