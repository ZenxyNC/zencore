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
    confirm, setConfirm
  }) {
  const [appMap, setAppMap] = useState([]);
  async function fetchAPI() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/allapps`);
      const data = await response.json();
      if(data) {
        console.log("App data OK");
        console.log("App Map OK");
        setAppMap(data);
      } else {
        throw new Error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching app data:", error);
    }
  }

  useEffect(() => {
    fetchAPI();
    console.log(appMap)
  }, []);
    
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
      {page === "home" && <HomePage userSettings={userSettings} appMap={appMap}/>}
      {page === "projects" && <Projects userSettings={userSettings} appMap={appMap}/>}
      {page === "account" && <Account confirm={confirm} setConfirm={setConfirm} />}
      {page === "settings" && <Settings 
        userSettings={userSettings} setUserSettings={setUserSettings}
        confirm={confirm} setConfirm={setConfirm}  
      />}
    </div>
  );
}
