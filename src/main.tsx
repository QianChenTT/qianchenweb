import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './stylesheets/index.css'
import './stylesheets/general.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,
)
