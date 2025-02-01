import './login.css'
import showIcon from '../../resource/icon/mdi_show.svg'
import hideIcon from '../../resource/icon/mdi_hide.svg'
import { useEffect, useRef, useState } from 'react'
import { _DATABASE } from './loginAssets';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [ZenID, setZenID] = useState(null);
  const [Password, setPassword] = useState(null);
  const [passwordType, setPasswordType] = useState("password")
  const navigate = useNavigate();




  const focuselement = useRef(null);

  useEffect(() => {
    focuselement.current.focus()
  }, [])

  class _LoginProcessor {
    #ZenID
    #Password
    constructor (ZenID, Password) {
      this.#ZenID = ZenID;
      this.#Password = Password
    };

    //Double-check data;
    verify() {
      if(this.#ZenID in _DATABASE) {
        if(this.#Password === _DATABASE[ZenID].credentials.password) {
          this.saveInfo()
        } else {
          console.error("Invalid password")
        }
      } else {
        console.error("Invalid ID")
      }
    }

    saveInfo() {
      localStorage.setItem("zenapps-global-id", this.#ZenID)
      this.redirect("/zencore/home")
    }

    redirect(target) {
      navigate(target)
    }

    autoLogin() {
      if(localStorage.getItem("zenapps-global-id") in _DATABASE) {
        this.redirect("/zencore/home")
      } else {
        console.error("Invalid ID : " + ZenID)
      }
    }
  }

  //Check if user logged in already.
  useEffect(() => {
    if(localStorage.getItem("zenapps-global-id") in _DATABASE) {
      setZenID(localStorage.getItem("zenapps-global-id") in _DATABASE);
      var confirmRedirect = window.confirm("Do you wish to proceed redirect to Home?");
      if(confirmRedirect) {
        LoginProcessor.autoLogin()
      }
    }
  //eslint-disable-next-line
  }, [])

  const LoginProcessor = new _LoginProcessor(ZenID, Password);

  const proceedLogin = (e) => {
    e.preventDefault();
    if(ZenID in _DATABASE) {
      document.getElementById("input-ZenID").style.border = "none"
      if(Password === _DATABASE[ZenID].credentials.password) {
        document.getElementById("input-Password").style.border = "none"
        LoginProcessor.verify()
      } else {
        document.getElementById("input-Password").style.border = "1px solid #FF393D"
      }
    } else {
      document.getElementById("input-ZenID").style.border = "1px solid #FF393D"
    }
  }

  function changePasswordType() {
    const buttonID = document.getElementById('input-Password-ChangeType')
    if(passwordType === "password") {
      setPasswordType("text")
      buttonID.style.backgroundImage = `url(${showIcon})`;
    } else {
      setPasswordType("password")
      buttonID.style.backgroundImage = `url(${hideIcon})`;
    }
  }

  return(
    <>
      <div id='login-main-div'>
        <div id='ZenCore-icon'></div>
        <form id='account-input' onSubmit={proceedLogin}>
          <input 
          type='text' 
          placeholder='ZenID' 
          id='input-ZenID' 
          autoComplete='off'
          autoCorrect='off'
          ref={focuselement}
          onInput={(e) => setZenID(e.target.value)}
          ></input>

          <input 
          type={`${passwordType}`} 
          placeholder='Password' 
          id='input-Password' 
          autoComplete='off'
          onInput={(e) => setPassword(e.target.value)}
          ></input>

          <button 
          type='button' 
          id='input-Password-ChangeType' 
          onClick={changePasswordType}
          ></button>

          <button
          type='submit'
          id='input-Submit'
          onClick={proceedLogin}
          >Login</button>
        </form>

        <div id='getZenID'>Get ZenID</div>
      </div>
    </>
  );
}