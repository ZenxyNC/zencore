import { useEffect, useState } from "react";
import "./alerts.css"
import { 
  IoCheckmark,
  IoClose,
  IoAlert,
  IoHelp,
  IoInformation,
  IoExtensionPuzzle
 } from "react-icons/io5";

export default function ZenEngineAlert({ AlertStructure, setAlertStructure, children }) {
  const [inputValue, setInputValue] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#F5F5F5");
  const [buttonText, setButtonText] = useState({
    primary: "Ok",
    secondary: "Cancel"
  });

  useEffect(() => {
    switch (AlertStructure.type || "information") {
      case "success":
        setPrimaryColor("#007AFF");
        setButtonText({
          primary: "Ok",
          secondary: false
        });
        break;
      case "error":
        setPrimaryColor("#FF393D");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      case "warning":
        setPrimaryColor("#FFCC00");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      case "confirmation":
        setPrimaryColor("#FFCC00");
        setButtonText({
          primary: "Yes",
          secondary: "Cancel"
        });
        break;
      case "information":
        setPrimaryColor("#F5F5F5");
        setButtonText({
          primary: "Ok",
          secondary: false
        });
        break;
      case "input":
        setPrimaryColor("#F5F5F5");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      default:
        setPrimaryColor("#F5F5F5");
    }
  }, [AlertStructure.type])

  function getIconByType(type) {
    switch (type) {
      case "success":
        return <IoCheckmark size={32} color={primaryColor}/>
      case "error":
        return <IoClose size={32} color={primaryColor}/>
      case "warning":
        return <IoAlert size={32} color={primaryColor}/>
      case "confirmation":
        return <IoHelp size={32} color={primaryColor}/>
      case "information":
        return <IoInformation size={32} color={primaryColor}/>
      case "input":
        return <IoExtensionPuzzle size={32} color={primaryColor}/>
      default:
        return <IoExtensionPuzzle size={32} color={primaryColor}/>
    }
  }

  function HandlePrimaryButton() {
    setAlertStructure((prev) => ({
      ...prev,
      isOpened: false,
    }));
    AlertStructure.actionOk();
  }

  function HandleSecondaryButton() {
    setInputValue("")
    setAlertStructure((prev) => ({
      ...prev,
      isOpened: false,
    }));
    AlertStructure.actionCancel();
  }

  return (
    <>
      <div id="alert-background" className={AlertStructure.isOpened ? "" : "hide"}>
        <div id="alert-mainbody" className={AlertStructure.type || "information"}>
          <div id="alert-type">
            <div id="alert-icon" className={AlertStructure.type || "information"}>
              {getIconByType(AlertStructure.type || "information")}
            </div>
            <h2 id="alert-title">{AlertStructure.title ? AlertStructure.title : AlertStructure.type.replace(/^./, (char) => char.toUpperCase())}</h2>
          </div>
          {
            AlertStructure.type === "input" ? (
              <input 
                type="text"
                placeholder={AlertStructure.placeholder}
                id="alert-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              children
            )
          }
          <div id="alert-buttons">
            <button 
              id="alert-button-secondary" 
              style={{ visibility: buttonText.secondary ? "visible" : "hidden" }}
              onClick={HandleSecondaryButton}
            >
              {buttonText.secondary}
            </button>

            <button 
              id="alert-button-primary" 
              style={{ backgroundColor: AlertStructure.type === "confirmation" ? "rgb(255, 204, 0, 0.8)" : "rgb(0, 122, 255, 0.8)" }}
              onClick={HandlePrimaryButton}
            >
              {buttonText.primary}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
