import './login.css'
import showIcon from '../../resource/icon/mdi_show.svg'
import hideIcon from '../../resource/icon/mdi_hide.svg'
import { useEffect, useRef, useState } from 'react'
import { _DATABASE } from './loginAssets';
import { useNavigate } from 'react-router-dom';
import { _hash } from './loginhasher'


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
      localStorage.setItem("zenapps-global-id", JSON.stringify({
        id: this.#ZenID,
        password_Hashed : Password
      }))
      this.redirect("/zencore/home")
    }

    redirect(target) {
      navigate(target)
    }

    autoLogin() {
      if(JSON.parse(localStorage.getItem("zenapps-global-id")).id in _DATABASE) {
        this.redirect("/zencore/home")
      } else {
        console.error("Invalid ID : " + ZenID)
      }
    }
  }

  //Check if user logged in already.
  useEffect(() => {
    try {
      var localID = JSON.parse(localStorage.getItem("zenapps-global-id"))
      if(localID.id in _DATABASE) {
        if(localID.password_Hashed === _DATABASE[localID.id].credentials.password) {
          setZenID(localID.id);
          setTimeout(() => {
            var confirmRedirect = window.confirm(`You're already logged in as ${localID.id}. Redirect to home?`);
            if(confirmRedirect) {
              LoginProcessor.autoLogin()
            }
          }, 2000)
        }
      }
    } catch(err) {
      
    }
  //eslint-disable-next-line
  }, [ZenID])

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

  function hashPassword(password) {
    let slicedPassword = password.split("");
    
    for(let i = 0; i < slicedPassword.length; i++) {
      if(_hash[slicedPassword[i]]) {
          slicedPassword[i] = _hash[slicedPassword[i]]
      } else {

      }

    }

    setPassword(slicedPassword.join(""))
  } 

  function changePasswordType() {
    const buttonID = document.getElementById('input-Password-ChangeType')
    if(passwordType === "password") {
      setPasswordType("text")
      buttonID.style.backgroundImage = `url(${showIcon})`;
      document.getElementById("input-Password").focus()
    } else {
      setPasswordType("password")
      buttonID.style.backgroundImage = `url(${hideIcon})`;
      document.getElementById("input-Password").focus()
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
          onInput={(e) => hashPassword(e.target.value)}
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