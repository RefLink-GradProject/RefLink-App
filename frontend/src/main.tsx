import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './output.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from './components/Footer.tsx'
import { Auth0ProviderWithNavigate } from './auth0/Auth0ProviderWithNavigate.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <div className="flex flex-col h-screen">
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <QueryClientProvider client={queryClient}>
          {/* <div className='flex justify-center'> */}

            <div className='grow mx-5 lg:mx-32 mb-5 md:mb-10 '>
              <App />


            {/* </div> */}
          </div>
          <Footer />
        </QueryClientProvider>
      </Auth0ProviderWithNavigate>

    </BrowserRouter>

    </div>


  // </React.StrictMode>,
)
