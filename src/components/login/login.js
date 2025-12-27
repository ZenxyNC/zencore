//Import style
import './login.css';

// Import module
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from './zenengine/snackbar/snackbar';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    message: '',
    duration: 3000,
  })

  function openSnackbar(message) {
    setSnackbar({
      isOpened : true, 
      message: message,
      duration: 3000
    })
  }

  function saveInfo() {
    var zencoreinfo = {
      isLoggedIn: true,
      isAutoLogin: false
    }

    //Save the info
    localStorage.setItem('zencore-info', JSON.stringify(zencoreinfo))
    
    //Save default local settings
    const defaultSettings = {
      hideContact: false,
      animatedBackground: false,
      openAtStart: 'home',
      openProjectIn: 'currenttab'
    }
    localStorage.setItem('zencore-usersettings', JSON.stringify(defaultSettings))
  }

  async function handleLogin() {
    try {
      const loginProcessor = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const loginProcessorState = await loginProcessor.json();

      if(loginProcessorState.ok) {
        localStorage.setItem('zencore-global-id', JSON.stringify({id: loginProcessorState.object.username, password_hashed: loginProcessorState.object.password}))
        saveInfo();
        openSnackbar('Logging in...');
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        openSnackbar(loginProcessorState.message);
      }
    } catch (err) {
      openSnackbar('Error while fetching API. Please try again later.');
    }
  }

  

  function handleSubmit(ev) {
    ev.preventDefault();
    handleLogin();
  }

  return(
    <>
      <div id='login-maindiv'>
        <div id='zencore-icon'></div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            autoComplete="off"
            onInput={(ev) => setCredentials({ ...credentials, username: ev.target.value })}
          />
          <input 
            type="password" 
            placeholder="Password" 
            autoComplete="off"
            onInput={(ev) => setCredentials({ ...credentials, password: ev.target.value })}
          />
          <button type="submit" id='login-button'>Login</button>
        </form>
      </div>
        {snackbar.isOpened && 
          <Snackbar 
            message={snackbar.message} 
            duration={snackbar.duration} 
            onClose={() => setSnackbar({ 
              isOpened: false, 
              message: '', 
              duration: 3000 
            })}
          />
        }
  
    </>
  )
}