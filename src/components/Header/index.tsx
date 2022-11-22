import styles from './Header.module.scss';

export const Header = () => (
	<div className={styles.Header}>
		<img src="/kelvin-logo.png" alt="Logo" className={styles.HeaderLogo} />
	</div>
);
