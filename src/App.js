import React, { useEffect } from 'react'
import { useAppContext } from './misc/model.provider'
import Webcam from './components/webcam'
import Phrase from './components/phrase'

const App = () => {
  const { setup, loading, message, } = useAppContext()

  useEffect(() => {
    setup()
  }, [])


  return (
    <>   
      {loading &&
        <div id="loading">
          {message}
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div> 
      }
      <div className="container-fluid text-center">
        <div className="row mb-4">
          <div className="col-lg-12 col-md-12">
            <h3 >IOT For Everyone</h3>
          </div>
        </div>
        <div className="row">
          <Webcam />
          <Phrase />
        </div>
      </div>
    </>
  )
}
export default App;