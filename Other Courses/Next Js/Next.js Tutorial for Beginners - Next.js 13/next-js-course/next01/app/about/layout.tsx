import React from 'react';
import styles from "./styles.module.css"

const AboutLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <nav>About NavBar</nav>
      <main className={styles.main}>
        {children}
      </main>
    </>
  );
};

export default AboutLayout;
