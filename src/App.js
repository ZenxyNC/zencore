import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";

import './App.css';
import './font-jakartaSans/importFont.css'

export default function App() {
  return (
    <>
      <Router basename="/zencore">
        <Routes>
          <Route path="/zencore/home" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/zencore/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}