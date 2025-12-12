//Import style
import './login.css';

//Import module
import loginProcessor from './secured-login/loginProcessor';
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

  async function handleLogin() {
    const userLogin = new loginProcessor(credentials.username, credentials.password);
    const userLoginState = await userLogin.startEngine();

    if (userLoginState.status === "OK") {
      var returnInfo = {
        id: userLoginState.message.name,
        password_hashed: userLoginState.message.password
      }
      var zencoreinfo = {
        isLoggedIn: true,
        isAutoLogin: false
      }

      //Save the info
      localStorage.setItem('zenapps-global-id', JSON.stringify(returnInfo))
      localStorage.setItem('zencore-info', JSON.stringify(zencoreinfo))
      
      //Save default local settings
      const defaultSettings = {
        hideContact: false,
        animatedBackground: false,
        openAtStart: 'home',
        openProjectIn: 'currenttab'
      }
      localStorage.setItem('zencore-usersettings', JSON.stringify(defaultSettings))

      //Redirect user
      setSnackbar({
        isOpened : true, 
        message: 'Redirecting...',
        duration: 5000
      });
      setTimeout(() => {
        navigate('/home')
      }, 1000);
    } else {
      setSnackbar({
        isOpened : true, 
        message: userLoginState.message,
        duration: 3000
      })
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