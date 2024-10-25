import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/login/Login.jsx"
import SignUp from "./pages/signup/SignUp.jsx"
import Home from "./pages/home/Home.jsx"
import Friends from './components/friends/Friends.jsx'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
function App() {
  const {authUser} = useAuthContext();

  return (
    <div className="p-4 flex justify-center items-center h-screen">
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
      <Toaster />
      
    </div>
  )
}

export default App
