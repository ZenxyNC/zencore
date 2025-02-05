import './home.css';
import '../../resource/font/importFont.css';
import { useEffect, useState } from 'react';
import { _DATABASE } from '../login/loginAssets';
import Sites from './mainCategory/Sites/Sites';
import GitHub from './mainCategory/Github/GitHub';
import Account from './mainCategory/Account/Account';
import Settings from './mainCategory/Settings/Settings';
import About from './mainCategory/About/About';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const [mainCategory, setMCategory] = useState("Software(Sites)");
  const [selectedCategory, setSelectedCategory] = useState("Sites");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  

  useEffect(() => {
    localStorage.removeItem("zenapps-global-id")
  }, [])

  const verifyUserData = (type, item) => {
    const getUID = JSON.parse(localStorage.getItem("zenapps-global-id")).id;
    if(type === "credentials") {
      if(_DATABASE[getUID].credentials[item] !== null) {
        return _DATABASE[getUID].credentials[item]
      } else if (_DATABASE[getUID].credentials[item] === null){
        return "Not Registered";
      } else {
        return "Is not a valid format."
      }
    } else if(type === "personal") {
      if(_DATABASE[getUID].personal[item] !== null) {
        return _DATABASE[getUID].credentials[item]
      } else if (_DATABASE[getUID].credentials.phone === null){
        return "Not Registered";
      } else {
        return "Is not a valid format."
      }
    }
  }


  const handleCategoryChanges = (changeTo) => {
    if(changeTo === "Sites") {
      setMCategory("Software(Sites)")
      setSelectedCategory("Sites")
      if(window.innerWidth < 1170) {
        handlePopup("close")
      }
    } else if (changeTo === "GitHub") {
      setMCategory("Software(GitHub)")
      setSelectedCategory("GitHub")
      if(window.innerWidth < 1170) {
        handlePopup("close")
      }
    } else if (changeTo === "Account") {
      setMCategory("Account")
      setSelectedCategory("Account")
      if(window.innerWidth < 1170) {
        handlePopup("close")
      }
    }  else if (changeTo === "Settings") {
      setMCategory("Settings")
      setSelectedCategory("Settings")
      if(window.innerWidth < 1170) {
        handlePopup("close")
      }
    }  else if (changeTo === "About") {
      setMCategory("About")
      setSelectedCategory("About");
      if(window.innerWidth < 1170) {
        handlePopup("close")
      }
    }

    else if(changeTo === "--mobile") {
      handlePopup("open")
    }

    
  }

  const handlePopup = (action) => {
    if(action === "open") {
      document.getElementById("popup-selector").style.display = "block"
    } else if(action === "close") {
      document.getElementById("popup-selector").style.display = "none"
    }
  }



  //style
  function updateSize() {
    try {
      const divSelector = document.getElementById("div-selector");
      const divProfile = document.getElementById("div-profile");
      const divSoftware = document.getElementById("div-mainCategory");
      const profileWidth = divProfile.offsetWidth + 20;
      const mCategoryHeight = divSoftware.offsetHeight;
      const heightOperator = mCategoryHeight - profileWidth - 0

      if(window.innerWidth >= 1170 ) {
        divSelector.style.height = `${heightOperator}px`;
        divSelector.style.top = `${profileWidth}px`;
      } else {

      }
    } catch(err) {
      console.error(err.message)
    }


    //phase 2
    try{
      const divProfile_userInfo = document.getElementById("divProfile-userInfo");
      const divProfile_image = document.getElementById("divProfile-image").offsetHeight + 20;

      if(window.innerWidth >= 1170) {
        divProfile_userInfo.style.top = `${divProfile_image + 15}px`
      } else {
        divProfile_userInfo.style.top = `${divProfile_image}px`
      }
    } catch(err) {
      console.error(err.message)
    }
  }
  
  // Run function on page load & resize
  window.addEventListener("load", updateSize);
  window.addEventListener("resize", updateSize);
  return(
    <>
      <div id='popup-selector'>
        <div className='filter-blur-layer' onClick={() => handlePopup("close")}></div>
        <div id='popup-alert-box'>
        <div className='selector-button' onClick={() => handleCategoryChanges("Sites")}>
          <div className='selectorButton-title'>Software(Sites)</div>
            {selectedCategory && 
              <div className={`selectorButton-arrow ${selectedCategory === "Sites" ? "show" : "hide"}`}></div>
            }
          </div>
          <div className='selector-button' onClick={() => handleCategoryChanges("GitHub")}>
            <div className='selectorButton-title'>Software(GitHub)</div>
            {selectedCategory && 
              <div className={`selectorButton-arrow ${selectedCategory === "GitHub" ? "show" : "hide"}`}></div>
            }
          </div>
          <div className='selector-button' onClick={() => handleCategoryChanges("Account")}>
            <div className='selectorButton-title'>Account</div>
            {selectedCategory && 
              <div className={`selectorButton-arrow ${selectedCategory === "Account" ? "show" : "hide"}`}></div>
            }
          </div>
          <div className='selector-button' onClick={() => handleCategoryChanges("Settings")}>
            <div className='selectorButton-title'>Settings</div>
            {selectedCategory && 
              <div className={`selectorButton-arrow ${selectedCategory === "Settings" ? "show" : "hide"}`}></div>
            }
          </div>
          <div className='selector-button' onClick={() => handleCategoryChanges("About")}>
            <div className='selectorButton-title'>About</div>
            {selectedCategory && 
              <div className={`selectorButton-arrow ${selectedCategory === "About" ? "show" : "hide"}`}></div>
            }
          </div>
        </div>
      </div>
      <div id='home-main-div'>
        <div id='div-profile' className='_container'>
          <div id='divProfile-image'></div>
          <div id='divProfile-userInfo'>
            {userData && 
              <div id='user-name'>{userData.user}</div>
            }
            {userData && 
              <div id='user-license'>{userData.license}</div>
            }
            <div id='divProfile-userInfo-separator'>
              {userData && 
                <div id='user-email'>{userData.email}</div>
              }
              {userData && 
                <div id='user-phone'>{userData.phone}</div>
              }
            </div>
          </div>
        </div>

        <div id='div-mainCategory' className='_container'>
          <div id='div-mainCategory-title'> {mainCategory} </div>
          {selectedCategory === "Sites" && <Sites />}
          {selectedCategory === "GitHub" && <GitHub />}
          {selectedCategory === "Account" && <Account />}
          {selectedCategory === "Settings" && <Settings />}
          {selectedCategory === "About" && <About />}
        </div>

        <div id='div-selector' className='_container'>
          <div id='selector-desktop-view'>
            <div className='selector-button' onClick={() => handleCategoryChanges("Sites")}>
              <div className='selectorButton-title'>Software(Sites)</div>
              {selectedCategory && 
                <div className={`selectorButton-arrow ${selectedCategory === "Sites" ? "show" : "hide"}`}></div>
              }
            </div>
            <div className='selector-button' onClick={() => handleCategoryChanges("GitHub")}>
              <div className='selectorButton-title'>Software(GitHub)</div>
              {selectedCategory && 
                <div className={`selectorButton-arrow ${selectedCategory === "GitHub" ? "show" : "hide"}`}></div>
              }
            </div>
            <div className='selector-button' onClick={() => handleCategoryChanges("Account")}>
              <div className='selectorButton-title'>Account</div>
              {selectedCategory && 
                <div className={`selectorButton-arrow ${selectedCategory === "Account" ? "show" : "hide"}`}></div>
              }
            </div>
            <div className='selector-button' onClick={() => handleCategoryChanges("Settings")}>
              <div className='selectorButton-title'>Settings</div>
              {selectedCategory && 
                <div className={`selectorButton-arrow ${selectedCategory === "Settings" ? "show" : "hide"}`}></div>
              }
            </div>
            <div className='selector-button' onClick={() => handleCategoryChanges("About")}>
              <div className='selectorButton-title'>About</div>
              {selectedCategory && 
                <div className={`selectorButton-arrow ${selectedCategory === "About" ? "show" : "hide"}`}></div>
              }
            </div>
          </div>
          <button id='selector-mobile-view' onClick={() => handleCategoryChanges("--mobile")}>
            <div id='selector-mobile-category'> {mainCategory} </div>
            <div id='selector-mobile-icon'></div>
          </button>
        </div>
      </div>
      {/*<button onClick={() => localStorage.setItem("zenapps-global-id", "Lucas Harel")}>Summon data</button>*/}
    </>
  );
}