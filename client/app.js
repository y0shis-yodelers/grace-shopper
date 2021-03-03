import React from 'react'

import {Navbar} from './components'
import AllProducts from './components/AllProducts'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <AllProducts />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
