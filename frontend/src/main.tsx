import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import Authprovider from './provider/AuthProvider.tsx'


const key=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!key){
  console.log("Missing publishable key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={key} afterSignOutUrl='/'>
      <Authprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Authprovider>
    </ClerkProvider>
  </StrictMode>,
)
