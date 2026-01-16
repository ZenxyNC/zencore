import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function AppButton({img, appname, url, openIn, addVisit}) {


  function redirect() {
    addVisit(appname)
    if(openIn === "currenttab"){
      window.location.href = url
    } else if (openIn === "newtab") {
      window.open(url, '_blank');
    }
  }

  return(
    <>
      <div 
        id="AppButton-body" 
        onClick={() => redirect()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            redirect();
          }
        }}
        translate='no'
      >
        <div id="AppButton-AppInfo">
          <LazyLoadImage 
            src={img}
            effect='blur'
            id='AppButton-image'
            style={{ borderRadius: '16px' }}
          />
          <div id="AppButton-name">{appname}</div>
        </div>
      </div>
    </>
  )
}