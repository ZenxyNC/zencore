import Sidebar from "./components/sidebar/sidebar"
import MNavbar from "./components/mobile.navbar/mobile.navbar"
import Pages from './components/pages/pages'
import Silk from "../../resources/animated-background/silk";
import {Confirm} from './alert/alert'

import './home.css'

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userSettings, setUserSettings] = useState()
  const [confirm, setConfirm] = useState({
    isOpened: false,
    title: '',
    message: '',
    action: null
  })
  
  var navigate = useNavigate();

  useEffect(() => {
    try {
      const savedInfo = JSON.parse(localStorage.getItem('zenapps-global-id'));
      if(savedInfo.id && savedInfo.password_hashed) {
        getUserSettings()
      } else {
        throw new Error("Incomplete required data.")
      }
    } catch (err) {
      //Redirect if user is not logged in.
      navigate('/zencore/login')
    }
  //eslint-disable-next-line
  }, [])

  function getUserSettings() {
    try {
      const savedSettings = localStorage.getItem('zencore-usersettings');
      if(savedSettings) {
        const parseSettings = JSON.parse(savedSettings);
        setUserSettings(parseSettings);
      } else {
        //No action
      }
    } finally {

    }
  }

  useEffect(() => {
    // Only save if userSettings is not undefined
    if (userSettings !== undefined) {
      localStorage.setItem('zencore-usersettings', JSON.stringify(userSettings))
      console.log(localStorage.getItem('zencore-usersettings'))
    }
  }, [userSettings])

  const handleConfirmClose = (result) => {
    // Get the action before closing the confirm dialog
    const actionToExecute = confirm.action;
    
    setConfirm(prevSettings => ({
      ...prevSettings,
      isOpened: false,
      action: null  // Clear the action
    }))

    if(result.ok) {
      // Execute the stored action if it exists
      if(actionToExecute && typeof actionToExecute === 'function') {
        actionToExecute();
      }
    } else if (!result.ok) {
      
    }
  }

  return (
    <>
      {confirm.isOpened && 
        <Confirm title={confirm.title} message={confirm.message} onClose={handleConfirmClose}/>
      }
      <div id="home-maindiv">
        <Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} userSettings={userSettings}/>
        <MNavbar setSidebarVisible={setSidebarVisible} />

        <Pages 
          userSettings={userSettings} setUserSettings={setUserSettings}
          confirm={confirm} setConfirm={setConfirm}
        />
      </div>
      <div id="animated-background" className={`${userSettings?.animatedBackground ? 'active' : ''}`}>
        <Silk
          speed={10}
          scale={1}
          color="#2f7dfa"
          noiseIntensity={2}
          rotation={0}
        />
      </div>
    </>
  );
}