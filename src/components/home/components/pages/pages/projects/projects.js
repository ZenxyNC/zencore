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



export default function Projects() {

  return (
    <>
      <div className="pages-title">Projects</div>
      <div className='pages-divider'></div>
      <div id='projects-maindiv'>
        <AppButton 
          img={ZenAI}
          appname="ZenAI"
          url="https://zenxync.github.io/zenai/"
        />
        <AppButton 
          img={ZenCourse}
          appname="ZenCourse"
          url="https://zenxync.github.io/zencourse/"
        />
        <AppButton 
          img={ZenGuard}
          appname="ZenGuard"
          url="https://zenxync.github.io/zenguard/"
        />
        <AppButton 
          img={GHCMDGEN}
          appname="GH Cmd"
          url="https://zenxync.github.io/gh-cmd-gen/"
        />
        <AppButton 
          img={ZenScreen}
          appname="ZenScreen"
          url="https://zenxync.github.io/zenscreen/"
        />
        <AppButton 
          img={ZenEngine}
          appname="ZenEngine"
          url="https://zenxync.github.io/zenengine/"
        />
      </div>
    </>
  )
}