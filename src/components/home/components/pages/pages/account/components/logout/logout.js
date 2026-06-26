import './logout.css'

export default function Logout({ username, AlertStructure, setAlertStructure }) {

  function handleLogout() {
    localStorage.setItem('zencore-info', JSON.stringify({ isAutoLogin: false }))
    localStorage.removeItem('zencore-user-info')
    window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zencore"
  }

  return(
    <>
      <div  
        className='componentbody' 
        id="logout-body"
        role='button'
        tabIndex={0}
        onClick={() => {
          setAlertStructure((prev) => ({
            ...prev,
            isOpened : true,
            type: "confirmation",
            title : "Logging out",
            message : `You will be logged out from ${username}. App settings will be removed and ZenApps Auto-Login will be turned off. Continue?`,
            actionOk: () => {
              handleLogout()
            },
            actionCancel: () => {
              setAlertStructure((prev) => ({
                ...prev,
                isOpened: false
              }))
            }
          }))
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