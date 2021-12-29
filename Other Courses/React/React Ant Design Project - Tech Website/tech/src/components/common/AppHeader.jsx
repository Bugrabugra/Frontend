import { Anchor, Button, Drawer, Menu } from "antd";
import React, { useState } from 'react'

const AppHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const showDrawer = () => setIsVisible(true);
  const hideDrawer = () => setIsVisible(false);
  
  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <a href="http://www.google.com">Tech</a>
        </div>

        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Anchor.Link href="#hero" title="Home" />
            <Anchor.Link href="#about" title="About" />
            <Anchor.Link href="#feature" title="Features" />
            <Anchor.Link href="#works" title="How it works" />
            <Anchor.Link href="#faq" title="FAQ" />
            <Anchor.Link href="#pricing" title="Pricing" />
            <Anchor.Link href="#contact" title="Contact" />
          </Anchor>
        </div>

        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars" />
          </Button>

          <Drawer
            placement="right"
            closable={false}
            onClose={hideDrawer}
            visible={isVisible}
          >
            <Anchor targetOffset="65">
              <Anchor.Link href="#hero" title="Home" />
              <Anchor.Link href="#about" title="About" />
              <Anchor.Link href="#feature" title="Features" />
              <Anchor.Link href="#works" title="How it works" />
              <Anchor.Link href="#faq" title="FAQ" />
              <Anchor.Link href="#pricing" title="Pricing" />
              <Anchor.Link href="#contact" title="Contact" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
