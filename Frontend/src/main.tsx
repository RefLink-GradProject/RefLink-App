import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Auth0Provider} from '@auth0/auth0-react'
import './output.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
  </React.StrictMode>,
)
