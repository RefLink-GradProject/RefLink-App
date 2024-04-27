import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import './output.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from './components/Footer.tsx'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Auth0Provider
  domain={import.meta.env.VITE_AUTH0_DOMAIN}
  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: "https://localhost:5000/register"
    }}
  >
     <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* <div className='flex justify-center'> */}
            <div className='max-w-screen-xl mx-8 lg:mx-15 mb-20'>
              <App />

            {/* </div> */}
          </div>
          <Footer />
        </QueryClientProvider>
      </BrowserRouter>
  </Auth0Provider>

  </React.StrictMode>,
)
