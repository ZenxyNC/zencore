import { useState } from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const [redirectPrompt] = useState(getSavedInfo());
  var navigate = useNavigate();

  function getSavedInfo() {
    try {
      const savedInfo = JSON.parse(localStorage.getItem('zencore-info'));
      if(savedInfo.isLoggedIn === true) {
        return "Home"
      }
    } catch(error) {
      return "Login"
    }
  }

  function redirectUser() {
    if(redirectPrompt === "Home") {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <div id="notfound-maindiv">
        <div id='zencore-icon'></div>
        <div id='notfound-title'>Empty. Let's go back.</div>
        <button onClick={() => {redirectUser()}}>{redirectPrompt}</button>
      </div>
    </>
  )
}