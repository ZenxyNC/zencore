import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './page-component/home/home';
import Login from './page-component/login/login';
import Admin from './page-component/admin/admin'

import './resource/font/importFont.css'

export default function App() {

  return (
    <>
    <Router basename="/zencore">
      <Routes>
        <Route path = "/*" element = {<Home />} />
        <Route path = "/home" element = {<Home />} />
        <Route path = "/login/" element = {<Login />} />
        <Route path = "/admin/" element = {<Admin />} />
      </Routes>
    </Router>
    </>
  );
}