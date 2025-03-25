import './Account.css'
import { useState } from 'react';
import checkmark from '../../../../resource/icon/checkmark.svg'
import crossmark from '../../../../resource/icon/crossmark.svg'
import logoutmark from '../../../../resource/icon/mdi_logout.svg'
import editmark from '../../../../resource/icon/mdi_edit.svg'
import { useNavigate } from 'react-router-dom';


export default function Account() {
  const [_autoLogin, setAutoLogin] = useState(true)
  const [ZenID, setZenID] = useState(JSON.parse(localStorage.getItem('zenapps-global-id')).id)
  const navigate = useNavigate()

  function updateSize() {
    try {
      const mainDiv_autoLogin = document.getElementById('mainDiv-autoLogin').offsetHeight;
      const mainDiv_linkedApps = document.getElementById('mainDiv-linkedApps');
      const mainDiv_modify = document.getElementById("mainDiv-modify")

      if(window.innerWidth >= 1170) {
        mainDiv_linkedApps.style.height = `${mainDiv_autoLogin}px`;
        mainDiv_modify.style.height = `${mainDiv_autoLogin}px` 
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



  function handleRedirect(path) {
    if(path === "/login/") {
      const confirmredirect = window.confirm(`Log out from ${ZenID}?`);
      if(confirmredirect) {
        localStorage.removeItem("zenapps-global-id")
        navigate(path)
      }
    } else if(path === "/modify-details/") {
      navigate(path)
    }
  }
  
  return(
    <>
      <div id='--Account-mainDiv'>
        <div className='_container-account' id='mainDiv-linkedApps'>
          <div className='--prop-title'>
            Linked apps
          </div>
          <div className='--prop-content' style={{opacity: 0.5}}>
            ZenCore<br/>
            ZenAI<br/>
            ZenCourse<br/>
            ZenScreen<br/>
            ZenGuard<br/>
            ZenEngine<br/>
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
           Log out from {ZenID}. ZenCore<span style={{color: "#FF393D"}}> will not sync </span>to ZenApps.
          </div>
          <button id='logout-mark' onClick={() => handleRedirect("/login/")}>
            <img src={logoutmark} id='logout-icon'/>
          </button>
        </div>

        <div className='_container-account' id='mainDiv-modify'>
          <div className='--prop-title'>
            Modify details
          </div>
          <div className='--prop-content' style={{opacity: 0.5}}>
            Modify {ZenID}'s account details, including credentials info or personal info.
            <br/><br/>
            Old info(s) <span style={{color: "#FF393D"}}> will not</span> be saved.
          </div>
          <button id='modify-mark' onClick={() => handleRedirect("/modify-details/")}>
            Modify
            <img src={editmark} id='logout-icon'/>
          </button>  
        </div>
        <div id='extender'></div>
      </div>
    </>
  ); 
}