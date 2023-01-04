import Link from 'next/link';

import styles from './Header.module.scss';

export const Header = () => (
	<div className={styles.Header}>
		<Link href="/">
			<img src="/kelvin-logo.png" alt="Logo" className={styles.HeaderLogo} />
		</Link>
	</div>
);
