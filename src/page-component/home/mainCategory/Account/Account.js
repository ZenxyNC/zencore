import './Account.css'
import { useState } from 'react';
import checkmark from '../../../../resource/icon/checkmark.svg'
import crossmark from '../../../../resource/icon/crossmark.svg'
import logoutmark from '../../../../resource/icon/mdi_logout.svg'
import { useNavigate } from 'react-router-dom';


export default function Account() {
  const [_autoLogin, setAutoLogin] = useState(true)
  const navigate = useNavigate()

  function updateSize() {
    try {
      const mainDiv_autoLogin = document.getElementById('mainDiv-autoLogin').offsetHeight;
      const mainDiv_linkedApps = document.getElementById('mainDiv-linkedApps');

      if(window.innerWidth >= 1170) {
        mainDiv_linkedApps.style.height = `${mainDiv_autoLogin}px`  
      } else {

      }
    } catch(err) {
      
    }
  }
  // Run function on page load & resize
  window.addEventListener("load", updateSize);
  window.addEventListener("resize", updateSize);
  setInterval(() => {
    updateSize()
  }, 700)

  function changeAutoLogin(){
    if(_autoLogin) {
      setAutoLogin(false)
      document.getElementById('autoLogin-mark').style.backgroundColor = "#FF393D";
      document.getElementById('autoLogin-icon').src = crossmark;
    } else if(!_autoLogin) {
      setAutoLogin(true)
      document.getElementById('autoLogin-mark').style.backgroundColor = "#007AFF";
      document.getElementById('autoLogin-icon').src = checkmark
    }
  }



  function handleLogout() {
    var confirmLogout = window.confirm(`Log out from ${JSON.parse(localStorage.getItem("zenapps-global-id")).id}?`)
    if(confirmLogout) {
      localStorage.removeItem("zenapps-global-id")
      navigate('/zencore/login')
    }
  }
  return(
    <>
      <div id='--Account-mainDiv'>
        <div className='_container-account' id='mainDiv-linkedApps'>
          <div className='--prop-title'>
            Linked Apps
          </div>
          <div className='--prop-content' style={{opacity: 0.5}}>
            ZenCore<br/>
            ZenAI<br/>
            ZenCourse<br/>
            ZenScreen<br/>
          </div>
        </div>

        <div className='_container-account' id='mainDiv-autoLogin'>
          <div className='--prop-title'>
            Auto-Login
          </div>
          <div className='--prop-content' style={{opacity: 0.5}}>
            Auto login to your account whenever you open ZenApps through <span style={{color: "#007AFF"}}>ZenCore</span>.
          </div>
          <button id='autoLogin-mark' onClick={changeAutoLogin}>
            <img src={checkmark} id='autoLogin-icon'/>
          </button>
        </div>

        <div className='_container-account' id='mainDiv-logout'>
          <div className='--prop-title'>
            Log out
          </div>
          <div className='--prop-content' style={{opacity: 0.5}}>
           Log out from {JSON.parse(localStorage.getItem('zenapps-global-id')).id}. ZenCore<span style={{color: "#FF393D"}}> will not sync </span>to ZenApps.
          </div>
          <button id='logout-mark' onClick={handleLogout}>
            <img src={logoutmark} id='logout-icon'/>
          </button>
        </div>
        <div id='extender'></div>
      </div>
    </>
  ); 
}