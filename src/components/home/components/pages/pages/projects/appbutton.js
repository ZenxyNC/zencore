import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function AppButton({img, appname, url}) {


  function redirect() {
    window.location.href = url
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
          />
          {/*<div
            id="AppButton-image"
            style={{backgroundImage: `url(${img})`}}
            role="button"
            tabIndex={0}
            
          ></div>*/}
          <div id="AppButton-name">{appname}</div>
        </div>
      </div>
    </>
  )
}