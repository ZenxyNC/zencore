import { useSearchParams } from 'react-router-dom';
import Projects from './pages/projects/projects';
import HomePage from './pages/home/home';
import Account from './pages/account/account';
import Settings from './pages/settings/settings';
import './pages.css';

export default function Pages({ 
    userSettings, setUserSettings,
    confirm, setConfirm
  }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "home";

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
