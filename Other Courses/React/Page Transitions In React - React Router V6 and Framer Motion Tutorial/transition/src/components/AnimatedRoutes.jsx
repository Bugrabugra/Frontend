import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { AnimatePresence } from "framer-motion";


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
  )
};

export default AnimatedRoutes;
