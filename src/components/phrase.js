import { useAppContext } from '../misc/model.provider'

const Phrase = () => {
    const { current_word } = useAppContext()

    return (
        <div className="textcontainer">
            <p>{current_word}</p>
        </div>
    )
}

export default Phrase