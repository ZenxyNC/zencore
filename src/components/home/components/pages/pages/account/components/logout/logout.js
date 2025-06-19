import './logout.css'
import { useNavigate } from 'react-router-dom'

export default function Logout({ username, confirm, setConfirm }) {
  var navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem('zenapps-global-id', JSON.stringify({id:'', password_hashed: ''}))
    navigate('/zencore/login')
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
            message : `You will be logged out from ${username}. Auto-login will be off, account info and settings will be removed from this device. Continue?`,
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