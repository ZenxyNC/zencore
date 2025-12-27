import '../pages.globalstyle.css';
import './projects.css'

import AppButton from './appbutton';

import { useState, useEffect } from 'react';


export default function Projects({ userSettings, appMap }) {

  const [recentVisit, setRecentVisit] = useState(() => {
    const savedVisit = localStorage.getItem('zencore-recentvisit');
    if (savedVisit) {
      try {
        return JSON.parse(savedVisit);
      } catch (error) {
        console.error("Failed to parse recent visits, resetting:", error);
        return ["ZenEngine", "ZenGuard"];
      }
    }
    return ["ZenEngine", "ZenGuard"];
  });

  useEffect(() => {
    localStorage.setItem('zencore-recentvisit', JSON.stringify(recentVisit));
  }, [recentVisit]);

  function addVisit(appName) {
    if(recentVisit.includes(appName)){
      setRecentVisit(prev => prev.filter(name => name !== appName));
    }
    setRecentVisit(prev => {
      if (prev.length < 5) {
        return [appName, ...prev];
      } else {
        return [appName, ...prev.slice(1)];
      }
    });
  }

  return (
    <>
      <div className="pages-title">Projects</div>
      <div className='pages-divider'></div>
      <div id='projects-maindiv'>
        {appMap.map((app, index) => (
          app.name !== "ZenCore" ? (
            <AppButton 
              key={index}
              img={app.icon}
              appname={app.name}
              url={app.url}
              openIn={userSettings?.openProjectIn}
              addVisit={addVisit}
            />
          ) : null
        ))}
        {/*{Object.entries(appMap).map(([key, value], index) => (
          <AppButton 
            key={index}
            img={value.icon}
            appname={value.name}
            url={value.url}
            openIn={userSettings?.openProjectIn}
            addVisit={addVisit}
          />
        ))}*/}
      </div>
    </>
  )
}