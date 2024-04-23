import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Auth0Provider} from '@auth0/auth0-react'
import './output.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Auth0Provider
    domain="dev-5u6q7n8kc0ytrj48.us.auth0.com"
    clientId="FI9oxO12W4vxfL1gh2PG6XXJIgbLj284"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
    <div className='m-12'>
      <App />
    </div>
    </BrowserRouter>
  </Auth0Provider>
  </React.StrictMode>,
)
