import Sidebar from "./components/sidebar/sidebar"
import MNavbar from "./components/mobile.navbar/mobile.navbar"
import Pages from './components/pages/pages'
import ColorBends from "../../resources/animated-background/colorBends";
import ZenEngineAlert from "./zenengine/alerts"

import './home.css'

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userSettings, setUserSettings] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [AlertStructure, setAlertStructure] = useState({
    isOpened: false,
    type: "confirmation",
    title: "Heavy Feature",
    message: "Animated background is a heavy feature due to high GPU usage and processing that may causing lags, glitch, and frame drops (depends on device). Turn on?",
    placeholder: "Enter text...",
    actionOk: () => {},
    actionCancel: () => {}
  });

  var navigate = useNavigate();

  useEffect(() => {
    try {
      const savedInfo = JSON.parse(localStorage.getItem('zencore-global-id'));
      if (savedInfo.id && savedInfo.password_hashed) {
        getUserSettings()
      } else {
        throw new Error("Incomplete required data.")
      }
    } catch (err) {
      //Redirect if user is not logged in.
      navigate('/login')
    }
    //eslint-disable-next-line
  }, [])

  function getUserSettings() {
    try {
      const savedSettings = localStorage.getItem('zencore-usersettings');
      if (savedSettings) {
        const parseSettings = JSON.parse(savedSettings);
        setUserSettings(parseSettings);

        if (parseSettings.openAtStart === 'home') {
          // The page is already home, do nothing
        } else if (parseSettings.openAtStart === 'projects') {
          setSearchParams({ page: 'projects' });
        }
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
    }
  }, [userSettings])



  return (
    <>
      <ZenEngineAlert AlertStructure={AlertStructure} setAlertStructure={setAlertStructure} >
        <p>{AlertStructure.message}</p>
      </ZenEngineAlert>
      <div id="home-maindiv">
        <Sidebar visible={sidebarVisible} setVisible={setSidebarVisible} userSettings={userSettings} />
        <MNavbar setSidebarVisible={setSidebarVisible} />

        <Pages
          userSettings={userSettings} setUserSettings={setUserSettings}
          AlertStructure={AlertStructure} setAlertStructure={setAlertStructure}
        />
      </div>
      {userSettings?.animatedBackground &&
        <div id="animated-background">
          <ColorBends
            rotation={0}
            speed={0.2}
            colors={['#7200F4', '#007AFF', '#45c2baff', '#0F131A']}
            transparent={false}
            autoRotate={0}
            scale={0.8}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0}
            parallax={0.5}
            noise={0.1}
          />
        </div>
      }
    </>
  );
}