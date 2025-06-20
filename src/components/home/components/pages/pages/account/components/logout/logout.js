import './logout.css'
import { useNavigate } from 'react-router-dom'

export default function Logout({ username, confirm, setConfirm }) {
  var navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem('zencore-info', JSON.stringify({isLoggedIn:false, isAutoLogin: false}))
    navigate('/login')
  }

  return(
    <>
      <div  
        className='componentbody' 
        id="logout-body"
        role='button'
        tabIndex={0}
        onClick={() => {
          setConfirm({
            isOpened : true,
            title : "Logging out",
            message : `You will be logged out from ${username}. App settings will be removed and ZenApps Auto-Login will be turned off. Continue?`,
            action: () => handleLogout()
          })
        }}
      >
        <div id='logout-title'>
          Log out
          <div id='logout-user'>from {username}</div>  
        </div>
      </div>
    </>
  )
}