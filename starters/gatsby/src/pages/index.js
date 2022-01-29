import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import * as styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.logo}>
        <StaticImage
          src="../../images/nacelle-logo.svg"
          width="500"
          placeholder="blurred"
          alt="Nacelle Logo"
        />
      </div>
      <h1>Welcome to your Nacelle Storefront</h1>
      <p>
        Edit <code className={styles.inlineCode}>pages/index.js</code> to get
        started.
      </p>
      <p>
        To learn more,{' '}
        <a href="https://nacelle.com/docs">visit the Nacelle documentation.</a>
      </p>
    </div>
  );
}
