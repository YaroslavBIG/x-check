import React from 'react';
import { Logo } from './Logo/Logo';
import styles from './Login.module.scss';
import { APP_VERSION } from '../../../config/version';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from './LoginForm/LoginForm';

export default function Login() {

  return (
    <div className={styles.login__container}>
      <div className={styles.login__logo}>
        <Logo/>
      </div>
      <div className={styles.login__form}>
        <LoginForm/>
      </div>
      <div className={styles.login__version}>
        <span>Version {APP_VERSION}</span>
      </div>
      <ToastContainer position='bottom-right' hideProgressBar/>
    </div>
  );
}
