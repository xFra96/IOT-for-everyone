import React, { useEffect } from 'react'
import { useAppContext } from './misc/model.provider'
import Webcam from './components/webcam'
import Phrase from './components/phrase'

const App = () => {
  const { setup, loading, message, } = useAppContext()

  useEffect(() => {
    let loader = document.querySelector("#loading")
    loader.style.display = loading ? "flex" : "none"
  }, [loading])

  useEffect(() => {
    setup()
  }, [])

  return (
    <>
      <div id="loading">
        {message}
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
      <div className="container-fluid mb-4 text-center">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h3 className="text-center">IOT For Everyone</h3>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <Webcam />
          </div>
          <div className="col-lg-6 col-md-12">
            <Phrase />
          </div>
        </div>
      </div>
    </>
  )
}
export default App;