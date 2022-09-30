import React, { useEffect, useState } from 'react'
import { useAppContext } from './model.provider'
import { Webcam } from './components/webcam'
import { Phrase } from './components/phrase'

const App = () => {
  const { setup } = useAppContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runSetup = async () => {
      await setup()
      setLoading(false)
    }
    runSetup()
  }, [])

  return (
    <>
      {loading &&
        <div id="loading">
          <p className='text-center'>Caricamento app...</p>
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