import './autologin.css'

import { useEffect, useState } from 'react'

export default function AutoLogin({ userSettings, setUserSettings }) {

  function handleChange() {
    setUserSettings({
      ...userSettings,
      isAutoLogin: !userSettings.isAutoLogin
    })
  }

  return(
    <>
      <div 
        className={`componentbody ${userSettings?.isAutoLogin ? 'active' : 'inactive'}`} 
        id="autoLogin-body"
        role='button'
        tabIndex={0}
        onClick={() => handleChange()}
      >
        <div id='autoLogin-title'>
          Auto<br/>Login
          <div id='autoLogin-indicator'> {userSettings?.isAutoLogin ? 'is active' : 'is inactive'} </div>  
        </div>
      </div>
    </>
  )
}