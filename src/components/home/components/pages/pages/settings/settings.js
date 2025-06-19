import './settings.css';
import Switch from './components/switch';
import { useEffect } from 'react';

export default function Settings({ userSettings, setUserSettings, confirm, setConfirm }) {

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
                setConfirm({
                  isOpened: true,
                  title: "Heavy feature",
                  message: "Animated background is a heavy feature due to high RAM usage and processing that may causing lags, glitch, and frame dropping (depends on device). Turn on?",
                  action: () => {
                    setUserSettings(prevSettings => ({
                      ...prevSettings,
                      animatedBackground: !prevSettings.animatedBackground
                    }));
                  } 
                })
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
      </div>
    </>
  )
}