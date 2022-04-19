import React from 'react'
import Dispersion from './Dispersion'
import HorizontalBar from './HorizontalBar'
import './MainPage.module.css'

function MainPage() {
  return (
    <div className="container m-5 p-5">
      <div className="col-6 column">
        <HorizontalBar />
      </div>
      <div className="col-6 column">
        <Dispersion />
      </div>
    </div>
  )
}

export default MainPage
