import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './slices/index.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>

)
