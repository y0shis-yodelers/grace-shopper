import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <div className="transparencyMask">
        <h1>404 Not Found.</h1>
        <div className="nf-iconContainer">
          <Link to="/home">
            <div className="material-icons quarter-turn">arrow_circle_up</div>
            <div>Back to Bass Shopper</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
