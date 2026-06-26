import './account.css'

import LinkedApps from './components/linkedapps/linkedapps';
import AutoLogin from './components/autologin/autologin';
import Logout from './components/logout/logout';
import EditDetails from './components/editdetails/editdetails';

import { useState } from 'react';

export default function Account({ AlertStructure, setAlertStructure }) {
  
  const [userInfo] = useState(getSavedInfo());

  function getSavedInfo() {
    var userdata_object
    try {
      const userInfo_parsed = JSON.parse(localStorage.getItem('zencore-user-info'))
      const zencoreInfo_parsed = JSON.parse(localStorage.getItem('zencore-info'))
      userdata_object = {
        username: userInfo_parsed.username,
        email: userInfo_parsed.email,
        phone: userInfo_parsed.phone,
        isAutoLogin: zencoreInfo_parsed.isAutoLogin || false
      }
    } catch (err) {

    }

    return userdata_object
  }

  return (
    <>
      <div className="pages-title">Account</div>
      <div className='pages-divider'></div>

      <div id='account-maindiv'>
        <LinkedApps />
        <AutoLogin autoLoginState={userInfo.isAutoLogin} />
        <Logout
          username={userInfo.username}
          AlertStructure={AlertStructure} setAlertStructure={setAlertStructure}
        />
        {/*<EditDetails userInfo={userInfo} />*/}
        <div id='account-bottomextender'></div>
      </div>
    </>
  )
}