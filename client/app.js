import React from 'react'
import {ToastContainer} from 'react-toastify'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
