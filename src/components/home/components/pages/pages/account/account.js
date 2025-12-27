import './account.css'

import LinkedApps from './components/linkedapps/linkedapps';
import AutoLogin from './components/autologin/autologin';
import Logout from './components/logout/logout';
import EditDetails from './components/editdetails/editdetails';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { _ASSETS } from '../../../../../login/secured-login/loginAssets'

export default function Account({ confirm, setConfirm }) {
  const navigate = useNavigate();
  const [userInfo] = useState(getSavedInfo());

  function getSavedInfo() {
    var userdata_object
    try {
      const userInfo_parsed = JSON.parse(localStorage.getItem('zencore-global-id'))
      const zencoreInfo_parsed = JSON.parse(localStorage.getItem('zencore-info'))
      userdata_object = {
        username: userInfo_parsed.id,
        license: _ASSETS[userInfo_parsed.id].credentials.license,
        email: _ASSETS[userInfo_parsed.id].credentials.email,
        phone: _ASSETS[userInfo_parsed.id].credentials.phone,
        isAutoLogin: zencoreInfo_parsed.isAutoLogin
      }
    } catch (err) {
      navigate('/login')
    }

    return userdata_object
  }

  return (
    <>
      <div className="pages-title">Account</div>
      <div className='pages-divider'></div>
      
      <div id='account-maindiv'>
        <LinkedApps />
        <AutoLogin autoLoginState={userInfo.isAutoLogin}/>
        <Logout 
          username={userInfo.username} 
          confirm={confirm} setConfirm={setConfirm}
        />
        {/*<EditDetails userInfo={userInfo} />*/}
        <div id='account-bottomextender'></div>
      </div>
    </>
  )
}