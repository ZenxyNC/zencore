import './recentlyvisited.css';

import AppButton from './appbutton';
import { useState, useEffect } from 'react';

export default function RecentVisit({ userSettings, appMap }) {

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

  function findMetadata(appName, index) {
    const app = appMap.find(app => app.name === appName);
    if (app) {
      return (
        <AppButton
          key={index}
          img={app.icon}
          appname={app.name}
          url={app.url}
          openIn={userSettings?.openProjectIn}
          addVisit={addVisit}
        />
      );
    }
    return null;
  }

  return (
    <>
      <div className="componentbody" id="recentvisit-body">
        <div className='components-title'>Recently Visited</div>
        <div className='components-divider'></div>
        <div id="recentvisit-maindiv">
          {recentVisit.map((app, index) => (
            findMetadata(app, index)
          ))}
        </div>
      </div>
    </>
  )
}