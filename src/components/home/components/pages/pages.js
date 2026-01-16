import { useSearchParams } from 'react-router-dom';
import Projects from './pages/projects/projects';
import HomePage from './pages/home/home';
import Account from './pages/account/account';
import Settings from './pages/settings/settings';
import './pages.css';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Pages({ 
    userSettings, setUserSettings,
    AlertStructure, setAlertStructure
  }) {
    
    var navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validParams = [
      'home',
      'projects',
      'account',
      'settings'
    ]
    const page = searchParams.get("page") || "home";
    useEffect(() => {
      if(validParams.includes(page)) {

      } else {
        navigate('/notfound')
      }
    })

  return (
    <div id="pages-maindiv">
      {page === "home" && <HomePage userSettings={userSettings} />}
      {page === "projects" && <Projects userSettings={userSettings} />}
      {page === "account" && <Account />}
      {page === "settings" && <Settings 
        userSettings={userSettings} setUserSettings={setUserSettings}
        AlertStructure={AlertStructure} setAlertStructure={setAlertStructure}  
      />}
    </div>
  );
}
