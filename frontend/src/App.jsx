import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/login/Login.jsx"
import SignUp from "./pages/signup/SignUp.jsx"
import Home from "./pages/home/Home.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 flex justify-center items-center h-screen">
      <Home />
      
    </div>
  )
}

export default App
