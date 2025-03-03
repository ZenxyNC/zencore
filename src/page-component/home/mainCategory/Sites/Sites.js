import './Sites.css'
import ZenAI from '../../../../resource/Appicon/ZenAI.svg'
import ZenCourse from '../../../../resource/Appicon/ZenCourse.png'
import ZenGuard from '../../../../resource/Appicon/ZenGuard.png'


export default function Sites() {


  function updateSize() {
    const appButton = document.querySelectorAll('.--Sites-appsButton');
    appButton.forEach(button => {
      button.style.height = button.offsetWidth + 'px'
    })
  }

  window.addEventListener('load', updateSize)
  window.addEventListener('resize', updateSize)
  setInterval(() => {
    updateSize()
  }, 800)


  function handleLocator(path) {
    window.location.href = path
  }
  return(
    <>
      <div id='--Sites-mainDiv'>
        <button className='--Sites-appsButton'>
          <img className='--appsButton-icon' src={ZenAI} alt='' />
          <div className='--appsButton-name'>ZenAI</div>
        </button>
                 
        <button className='--Sites-appsButton' onClick={() => handleLocator(`https://zenxync.github.io/zencourse/`)}>
          <img className='--appsButton-icon' src={ZenCourse} alt='' />
          <div className='--appsButton-name'>ZenCourse</div>
        </button>

        <button className='--Sites-appsButton' onClick={() => handleLocator(`https://zenxync.github.io/zenguard`)}>
          <img className='--appsButton-icon' src={ZenGuard} alt='' />
          <div className='--appsButton-name'>ZenGuard</div>
        </button>
        <div id='extender'></div>
      </div>
    </>
  ); 
}