import './recentlyvisited.css';

import AppButton from './appbutton';
import { useState, useEffect } from 'react';

import ZenGuard from '../../../../../../../../resources/appicon/ZenGuard.png'

export default function RecentVisit({ userSettings }) {

const appMap = {
    'ZenAI': {
      name: 'ZenAI',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zenai/refs/heads/main/src/resource/icon.svg",
      url: 'https://zenxync.github.io/zenai/',
    },
    'ZenCourse': {
      name: 'ZenCourse',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zencourse/refs/heads/main/src/resource/Icon.png",
      url: 'https://zenxync.github.io/zencourse/',
    },
    'ZenGuard': {
      name: 'ZenGuard',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zenguard.png",
      url: 'https://zenxync.github.io/zenguard/',
    },
    'GitHelper': {
      name: 'GitHelper',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/githelper.png",
      url: 'https://zenxync.github.io/githelper/',
    },
    'ZenClock': {
      name: 'ZenClock',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zenclock.png",
      url: 'https://zenxync.github.io/zenclock/',
    },
    'ZenEngine': {
      name: 'ZenEngine',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zenengine.png",
      url: 'https://zenxync.github.io/zenengine/',
    },
    'ZenDocs': {
      name: 'ZenDocs',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zendocs.png",
      url: 'https://zenxync.github.io/zendocs/',
    },
    'ZenApps': {
      name: 'ZenApps',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zenapps.png",
      url: 'https://zenxync.github.io/zenapps/',
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