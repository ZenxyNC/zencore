import './autologin.css'

import { useState } from 'react'

export default function AutoLogin({ autoLoginState }) {
  const [isAutoLogin, setAutoLogin] = useState(autoLoginState);

  function handleChange() {
    const zencoreInfo_parsed = JSON.parse(localStorage.getItem('zencore-info'))
    
    // Update only the isAutoLogin property
    const updatedInfo = {
      ...zencoreInfo_parsed,  // Spread existing properties
      isAutoLogin: !isAutoLogin  // Toggle only this property
    }
    
    // Save back to localStorage
    localStorage.setItem('zencore-info', JSON.stringify(updatedInfo))
    
    // Update state
    setAutoLogin(!isAutoLogin)
  }

  return(
    <>
      <div 
        className={`componentbody ${isAutoLogin ? 'active' : 'inactive'}`} 
        id="autoLogin-body"
        role='button'
        tabIndex={0}
        onClick={() => handleChange()}
      >
        <div id='autoLogin-title'>
          Auto<br/>Login
          <div id='autoLogin-indicator'> {isAutoLogin ? 'is active' : 'is inactive'} </div>  
        </div>
      </div>
    </>
  )
}