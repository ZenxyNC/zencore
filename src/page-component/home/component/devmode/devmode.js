import { useState, useEffect } from 'react';

import './devmode.css'

export default function Devmode() {

  const [connectedDevices, setConnectedDevices] = useState(); //Declare the variable as list. This will be used to save the connected device(s).
  const [isDeveloper, setIsDeveloper] = useState()
  const [connectionStatus, setConnectionStatus] = useState("Connect a developer device")

  //Next, request a permission to access USB device(s).
  const requestUSBAccess = async() => {
    try {

      //Wait for user permission.
      const device = await navigator.usb.requestDevice({
        filters : []
      });

      //If permitted
      if(device) {
        setConnectedDevices(device);
        if(device.serialNumber) {
          if(device.serialNumber === "YHHYUOFA9D5HDY5L") {
            setConnectedDevices(device)
            setIsDeveloper("LUCAS")
            document.getElementById('devmode-box').style.height = "calc(40vh + 80px)"
            document.getElementById('devmodeBox-contentArea').style.height = "calc(100% - 160px)"
          }
        }
      }
    } catch (error) {
      console.error(`Error accessing device : ${error}`);
    }
  }

  //Listen the connection changes
  useEffect(() => {
    const onConnect = () => {
      setConnectionStatus("A device has connected.")
      setTimeout(() => {
        setConnectionStatus("Press button to continue.")
      }, 800);
    };

    const onDisconnect = (ev) => {
      setConnectedDevices()
    }

    navigator.usb.addEventListener('connect', onConnect);
    navigator.usb.addEventListener('disconnect', onDisconnect);

    return () => {
      navigator.usb.removeEventListener('connect', onConnect);
      navigator.usb.removeEventListener('disconnect', onDisconnect);
    }
  }, [])

  return(
    <>
      <div id="devmode-maindiv">
        <div id='devmode-box'>
          <div id='devmodeBox-contentArea'>
            <div id='devmode-img'>
              <label>{connectionStatus}</label>
            </div>
          </div>

          {isDeveloper &&
            <button id='devmode-cPanel'>
              Dev Control Panel
            </button>
          }

          <button id='devmode-connectButton' onClick={requestUSBAccess}>
            {isDeveloper ? "Continue" : "Connect"}
          </button>
        </div>
      </div>
    </>
  )
}