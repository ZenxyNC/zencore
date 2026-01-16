import './settings.css';
import Switch from './components/switch';
import { useEffect } from 'react';

export default function Settings({ userSettings, setUserSettings, AlertStructure, setAlertStructure }) {

  return (
    <>
      <div className="pages-title">Settings</div>
      <div className='pages-divider'></div>

      <div id="settings-maindiv">
        <div className='settings-option'>
          <div className='settingsOption-label'>Hide Email and Phone Number</div>
          <Switch 
            onInput={() => {
              setUserSettings(prevSettings => ({
                ...prevSettings,
                hideContact: !prevSettings.hideContact
              }));  
            }}
            value={userSettings?.hideContact}
          />
        </div>

        <div className='settings-option'>
          <div className='settingsOption-label'>Animated background</div>
          <Switch 
            onInput={() => {
              if(!userSettings?.animatedBackground) {
                setAlertStructure((prev) => ({
                  ...prev,
                  isOpened: true,
                  type: "confirmation",
                  title: "Heavy feature",
                  message: "Animated background is a heavy feature due to high GPU usage and processing that may causing lags, glitch, and frame drops (depends on device). Turn on?",
                  actionOk: () => {
                    setUserSettings(prevSettings => ({
                      ...prevSettings,
                      animatedBackground: !prevSettings.animatedBackground
                    }));
                  },
                  actionCancel: () => {
                    setAlertStructure((prev) => ({
                      ...prev,
                      isOpened: false
                    }));
                  }
                }))
              } else {
                setUserSettings(prevSettings => ({
                  ...prevSettings,
                  animatedBackground: !prevSettings.animatedBackground
                }));
              }
            }}
            value={userSettings?.animatedBackground}
          />
        </div>

        <div className='settings-option'>
          <div className='settingsOption-label'>Open at start</div>
          <select
            id='settings-dropdown'
            value={userSettings?.openAtStart}
            onChange={(e) => {
              setUserSettings(prevSettings => ({
                ...prevSettings,
                openAtStart: e.target.value
              }));
            }}
          >
            <option value="home">Home</option>
            <option value="projects">Projects</option>
          </select>
        </div>

        <div className='settings-option'>
          <div className='settingsOption-label'>Open project in</div>
          <select
            id='settings-dropdown'
            value={userSettings?.openProjectIn}
            onChange={(e) => {
              setUserSettings(prevSettings => ({
                ...prevSettings,
                openProjectIn: e.target.value
              }));
            }}
          >
            <option value="currenttab">Current tab</option>
            <option value="newtab">New tab</option>
          </select>
        </div>
      </div>
    </>
  )
}