import './Sites.css'
import ZenAI from '../../../../resource/Appicon/ZenAI.svg'
import ZenCourse from '../../../../resource/Appicon/ZenCourse.png'


export default function Sites() {


  function updateSize() {
    const appButton = document.querySelectorAll('.--Sites-appsButton');
    appButton.forEach(button => {
      button.style.height = button.offsetWidth + 'px'
    })
  }
  setInterval(() => {
    updateSize()
  }, 1200)
  window.addEventListener('load', updateSize)


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
        <div id='extender'></div>
      </div>
    </>
  ); 
}