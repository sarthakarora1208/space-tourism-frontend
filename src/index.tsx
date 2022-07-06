import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './app/App'

const root = document.getElementById('root')!

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
)
