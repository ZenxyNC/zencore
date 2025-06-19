import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './sidebar.css';

import { _ASSETS } from '../../../login/secured-login/loginAssets';

export default function Sidebar({ visible, setVisible, userSettings }) {
  const navigate = useNavigate();
  const [userinfo] = useState(getSavedInfo() || {username: '', license: '', email: '', phone: ''});
  const [currentPage, setCurrentPage] = useState('home');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page") || "home";
    setCurrentPage(page)
  }, [searchParams])

  function handleNavigation(page) {
    setSearchParams({ page }); // sets ?page=projects, etc.
    setVisible(false); // optionally hide sidebar after click
  }

  function handlePageChange(target) {
    setCurrentPage(target)
    handleNavigation(target)
  }

  function getSavedInfo() {
    var userdata_object
    try {
      const userInfo_parsed = JSON.parse(localStorage.getItem('zenapps-global-id'))
      userdata_object = {
        username: userInfo_parsed.id,
        license: _ASSETS[userInfo_parsed.id].credentials.license,
        email: _ASSETS[userInfo_parsed.id].credentials.email,
        phone: _ASSETS[userInfo_parsed.id].credentials.phone,
      }
    } catch (err) {
      navigate('/zencore/login')
    }

    return userdata_object
  }

  function findInitial() {
    try {
      const [fname, lname] = userinfo.username.split(" ");
      const defineFirstLetter = fname[0] + lname[0];
      return defineFirstLetter
    } catch (err) {
      navigate('/zencore/login')
    }
  }


  // Function to censor email
  function censorEmail(email) {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    const censoredLocal = localPart.slice(0, 3) + '******' + localPart.slice(-3);
    return `${censoredLocal}@${domain}`;
  }

  // Function to censor phone
  function censorPhone(phone) {
    if (!phone) return '';
    // Assuming format like "+1 1234567890" or similar
    const cleaned = phone.replace(/\D/g, ''); // Remove non-digits
    const countryCode = phone.match(/^\+\d+/)?.[0] || '';
    const lastThree = cleaned.slice(-3);
    return `${countryCode} ******${lastThree}`;
  }

  return(
    <>
      <div 
        id='sidebar-closearea'
        onClick={() => setVisible(false)}
        className={visible ? "show" : ''}
      ></div>
      <div id="sidebar-maindiv" className={visible ? "show" : "hide"}>
        <div id='useridentity-profile'>{findInitial()}</div>
        <div id='useridentity-self'>
          <div id='useridentity-name'>{userinfo.username}</div>
          <div id='useridentity-license'>{userinfo.license}</div>
        </div>

        <div id='useridentity-contact' translate='no'>
          <div id='useridentity-email'> {userSettings?.hideContact ? censorEmail(userinfo.email) : userinfo.email}</div>
          <div id='useridentity-phone' style={{marginTop: '5px'}}> {userSettings?.hideContact ? censorPhone(userinfo.phone) : userinfo.phone}</div>
        </div>

        <div
          className='divider-line'
          style={{marginTop: '30px'}}
        />

        <div id='page-selector'>
          <div 
            className={`${currentPage === "home" ? 'page-selector-div active' : 'page-selector-div inactive'}`}
            tabIndex={0}
            role='button'
            onClick={() => handlePageChange("home")}
          >
            <div className={`${currentPage === "home" ? 'pageselector-pointer active' : 'pageselector-pointer inactive'}`}></div>
            <div className='pageselector-label'>Home</div>
          </div>

          <div 
            className={`${currentPage === "projects" ? 'page-selector-div active' : 'page-selector-div inactive'}`}
            tabIndex={0}
            role='button'
            onClick={() => handlePageChange("projects")}
          >
            <div className={`${currentPage === "projects" ? 'pageselector-pointer active' : 'pageselector-pointer inactive'}`}></div>
            <div className='pageselector-label'>Projects</div>
          </div>

          <div 
            className={`${currentPage === "account" ? 'page-selector-div active' : 'page-selector-div inactive'}`}
            tabIndex={0}
            role='button'
            onClick={() => handlePageChange("account")}
          >
            <div className={`${currentPage === "account" ? 'pageselector-pointer active' : 'pageselector-pointer inactive'}`}></div>
            <div className='pageselector-label'>Account</div>
          </div>
          
          <div 
            className={`${currentPage === "settings" ? 'page-selector-div active' : 'page-selector-div inactive'}`}
            tabIndex={0}
            role='button'
            onClick={() => handlePageChange("settings")}
          >
            <div className={`${currentPage === "settings" ? 'pageselector-pointer active' : 'pageselector-pointer inactive'}`}></div>
            <div className='pageselector-label'>Settings</div>
          </div>
        </div>
      </div>
    </>
  )
}