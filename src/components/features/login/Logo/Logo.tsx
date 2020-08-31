import logo from '../../../../assets/logo.png';
import React from 'react';
import styles from './Logo.module.scss';

export function Logo() {

  return (
    <h1>
      <img src={logo} alt="logo" className={styles.logo}/>
    </h1>
  );
}
