import './home.css';
import './components/components.globalstyle.css'
import UserGreeting from './components/userGreeting/userGreeting';
import RecentVisit from './components/recently-visited/recentlyvisited';
import QuickActions from './components/quick-actions/quick-actions';

export default function Home() {
  

  return (
    <>
      <div className="pages-title">Home</div>
      <div className='pages-divider'></div>

      <div id="homeactivity-maindiv">
        <UserGreeting />
        <RecentVisit />
        <div id='homeactivity-bottomextender'></div>
      </div>
    </>
  )
}