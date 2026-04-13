/**
 * Frontend Application Entry Point
 * --------------------------------
 * Initializes the React application, mounting the root component 
 * to the DOM. configures global providers like React Router and 
 * registers the Service Worker for Offline (PWA) capabilities.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
