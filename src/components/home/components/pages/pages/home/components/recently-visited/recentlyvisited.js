import './recentlyvisited.css';

import AppButton from './appbutton';
import { useState, useEffect } from 'react';

//App icon
import ZenAI from '../../../../../../../../resources/appicon/ZenAI.svg'
import ZenCourse from '../../../../../../../../resources/appicon/ZenCourse.png'
import ZenGuard from '../../../../../../../../resources/appicon/ZenGuard.png'
import GitHelper from '../../../../../../../../resources/appicon/githelper.svg'
import ZenClock from '../../../../../../../../resources/appicon/zenclock.svg'
import ZenEngine from '../../../../../../../../resources/appicon/ZenEngine.svg'

export default function RecentVisit({ userSettings }) {

  const appMap = {
    'ZenAI': {
      name: 'ZenAI',
      icon: ZenAI,
      url: 'https://zenxync.github.io/zenai/',
    },
    'ZenCourse': {
      name: 'ZenCourse',
      icon: ZenCourse,
      url: 'https://zenxync.github.io/zencourse/',
    },
    'ZenGuard': {
      name: 'ZenGuard',
      icon: ZenGuard,
      url: 'https://zenxync.github.io/zenguard/',
    },
    'GitHelper': {
      name: 'GitHelper',
      icon: GitHelper,
      url: 'https://zenxync.github.io/githelper/',
    },
    'ZenClock': {
      name: 'ZenClock',
      icon: ZenClock,
      url: 'https://zenxync.github.io/zenclock/',
    },
    'ZenEngine': {
      name: 'ZenEngine',
      icon: ZenEngine,
      url: 'https://zenxync.github.io/zenengine/',
    }
  }

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
    console.log(recentVisit);
  }, [recentVisit]);

  function addVisit(appName) {
    console.log(appName)
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
      <div className="componentbody" id="recentvisit-body">
        <div className='components-title'>Recently Visited</div>
        <div className='components-divider'></div>
        <div id="recentvisit-maindiv">
          {recentVisit.map((app, index) => (
            <AppButton
              key={index}
              img={appMap[app].icon}
              appname={appMap[app].name}
              url={appMap[app].url}
              openIn={userSettings?.openProjectIn}
              addVisit={addVisit}
            />
          ))}
        </div>
      </div>
    </>
  )
}