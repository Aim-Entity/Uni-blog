import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Fragment>
      <BrowserRouter basename=''>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </StrictMode>,

)
