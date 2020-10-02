import React from 'react';
import Logo from './Logo/Logo';
import styles from './Login.module.scss';
import { APP_VERSION } from '../../../config/version';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm/LoginForm';

export default function Login() {
	toast.warn('Ссылка на исходный код внизу страницы');
	return (
		<div className={styles.login__container}>
			<div className={styles.login__logo}>
				<Logo />
			</div>
			<div className={styles.login__form}>
				<LoginForm />
			</div>
			<div className={styles.login__version}>
				<span>Version {APP_VERSION}</span>
				<span>
					<a href='https://github.com/SkyWalker1996x/x-check/pull/40'>&nbsp;Link to Source code</a>
				</span>
			</div>
			<ToastContainer position='bottom-right' hideProgressBar />
		</div>
	);
}
