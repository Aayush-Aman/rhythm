import './App.css'
// import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
// import { Button } from './components/ui/button'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

    </Routes>
    </>
  )
}

export default App