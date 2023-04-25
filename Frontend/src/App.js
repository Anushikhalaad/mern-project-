import React, {useState} from 'react'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from './components/Alert';

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{

    setAlert({
      msg: message,
      type: type

    })
    setTimeout( () => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <Navbar/>
    <Alert  alert={alert}/>
      <Home showAlert={showAlert} />
    </>
  )
}

export default App
