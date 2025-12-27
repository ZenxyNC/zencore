import '../pages.globalstyle.css';
import './projects.css'

import AppButton from './appbutton';

import ZenGuard from '../../../../../../resources/appicon/ZenGuard.png'

import { useState, useEffect } from 'react';


export default function Projects({ userSettings }) {
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
      icon: ZenGuard,
      url: 'https://zenxync.github.io/zenguard/',
    },
    'GitHelper': {
      name: 'GitHelper',
      icon: "https://raw.githubusercontent.com/ZenxyNC/githelper/refs/heads/main/public/favicon.svg",
      url: 'https://zenxync.github.io/githelper/',
    },
    'ZenClock': {
      name: 'ZenClock',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zenclock/refs/heads/main/public/favicon.svg",
      url: 'https://zenxync.github.io/zenclock/',
    },
    'ZenEngine': {
      name: 'ZenEngine',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zenengine/refs/heads/main/public/zenengine.svg",
      url: 'https://zenxync.github.io/zenengine/',
    },
    'ZenDocs': {
      name: 'ZenDocs',
      icon: "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/zendocs-plain.svg",
      url: 'https://zenxync.github.io/zendocs/',
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