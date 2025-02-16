import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './page-component/home/home';
import Login from './page-component/login/login';

import './resource/font/importFont.css'

export default function App() {

  return (
    <>
    <Router basename="/zencore">
      <Routes>
        <Route path = "/*" element = {<Home />} />
        <Route path = "/zencore/home" element = {<Home />} />
        <Route path = "/zencore/login" element = {<Login />} />
        <Route path = "/zencore/admin" element = {<Login />} />
      </Routes>
    </Router>
    </>
  );
}