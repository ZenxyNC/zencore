import { useSearchParams } from 'react-router-dom';
import Projects from './pages/projects/projects';
import HomePage from './pages/home/home';
import Account from './pages/account/account';
import Settings from './pages/settings/settings';
import './pages.css';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Pages({ 
    userSettings, setUserSettings,
    confirm, setConfirm
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
      navigate('/home')
    }
  })

  return (
    <div id="pages-maindiv">
      {page === "home" && <HomePage />}
      {page === "projects" && <Projects />}
      {page === "account" && <Account confirm={confirm} setConfirm={setConfirm} />}
      {page === "settings" && <Settings 
        userSettings={userSettings} setUserSettings={setUserSettings}
        confirm={confirm} setConfirm={setConfirm}  
      />}
    </div>
  );
}
