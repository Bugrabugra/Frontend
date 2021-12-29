import React from 'react'
import AppAbout from "../components/home/AppAbout";
import AppContact from "../components/home/AppContact";
import AppFAQ from "../components/home/AppFAQ";
import AppFeature from "../components/home/AppFeature";
import AppHero from "../components/home/AppHero";
import AppPricing from "../components/home/AppPricing";
import AppWorks from "../components/home/AppWorks";

const AppHome = () => {
  return (
    <div className="main">
      <AppHero/>
      <AppAbout/>
      <AppFeature/>
      <AppWorks/>
      <AppFAQ/>
      <AppPricing/>
      <AppContact/>
    </div>
  )
}

export default AppHome;