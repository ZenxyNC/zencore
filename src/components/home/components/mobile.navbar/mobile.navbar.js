import './mobile.navbar.css';

export default function MNavbar({ setSidebarVisible }) {
  return (
    <>
      <div id='navbar-maindiv'>
        <div id='navbar-zencoreIcon'></div>
        <div id='navbar-label'>ZenCore</div>
        <div 
          id='navbar-menu'
          role='button'
          tabIndex={0}
          onClick={() => setSidebarVisible(true)}
        ></div>
      </div>
    </>
  );
}
