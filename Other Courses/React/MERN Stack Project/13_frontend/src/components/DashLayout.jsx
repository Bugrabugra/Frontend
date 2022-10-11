import React from 'react';
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader.jsx";
import DashFooter from "./DashFooter.jsx";


const DashLayout = () => {
  return (
    <>
      <DashHeader/>
      <div className="dash-container">
        <Outlet/>
      </div>
      <DashFooter/>
    </>
  );
};

export default DashLayout;
