import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppearanceProvider } from './context/AppearanceContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  </React.StrictMode>,
)
