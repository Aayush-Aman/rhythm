import './App.css'
// import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
// import { Button } from './components/ui/button'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/homepage'
import AuthCallbackPage from './pages/Auth-callback/authCallbackPage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import MainLayout from './Layout/MainLayout'
import ChatPage from './pages/chat/chatPage'

function App() {
  return (
    <>
    <Routes>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
      <Route element={< MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />


      </Route>

    </Routes>
    </>
  )
}

export default App