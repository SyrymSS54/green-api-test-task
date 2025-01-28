import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Auth from './auth/Auth'
import { useSelector } from 'react-redux'
import Chat from './chat/Chat'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const idInstance = useSelector(state => state.auth.idInstance);
  const apiTokenInstance = useSelector(state => state.auth.apiTokenInstance);

  return (
    <>
      {
        idInstance == '' & apiTokenInstance == '' ? <Auth/> : <Chat/>
      }
    </>
  )
}

export default App
