import '../pages.globalstyle.css';
import './projects.css'

import AppButton from './appbutton';

//AppIcon
import ZenAI from '../../../../../../resources/appicon/ZenAI.svg'
import ZenCourse from '../../../../../../resources/appicon/ZenCourse.png'
import ZenGuard from '../../../../../../resources/appicon/ZenGuard.png'
import GHCMDGEN from '../../../../../../resources/appicon/gh-cmd-gen.png'
import ZenScreen from '../../../../../../resources/appicon/ZenScreen.png'
import ZenEngine from '../../../../../../resources/appicon/ZenEngine.svg'

import { useState, useEffect } from 'react';


export default function Projects({ userSettings }) {
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
    'GH Cmd': {
      name: 'GH Cmd',
      icon: GHCMDGEN,
      url: 'https://zenxync.github.io/gh-cmd-gen/',
    },
    'ZenScreen': {
      name: 'ZenScreen',
      icon: ZenScreen,
      url: 'https://zenxync.github.io/zenscreen/',
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
      <div className="pages-title">Projects</div>
      <div className='pages-divider'></div>
      <div id='projects-maindiv'>
        {Object.entries(appMap).map(([key, value], index) => (
          <AppButton 
            key={index}
            img={value.icon}
            appname={value.name}
            url={value.url}
            openIn={userSettings?.openProjectIn}
            addVisit={addVisit}
          />
        ))}
      </div>
    </>
  )
}