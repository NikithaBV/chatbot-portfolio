import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatBot from './components/Chatbot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ChatBot/>
      </div>
    </>
  )
}

export default App
