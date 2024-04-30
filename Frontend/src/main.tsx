import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from './components/Footer.tsx'
import { Auth0ProviderWithNavigate } from './auth0/Auth0ProviderWithNavigate.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <QueryClientProvider client={queryClient}>
          {/* <div className='flex justify-center'> */}

          <div className='max-w-screen-xl mx-8 lg:mx-15 mb-20 min-h-full'>
            <App />

            {/* </div> */}
          </div>
          <Footer />
        </QueryClientProvider>
      </Auth0ProviderWithNavigate>

    </BrowserRouter>


  </React.StrictMode>,
)
