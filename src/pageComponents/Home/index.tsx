'use client';

import Link from 'next/link';

import styles from './Home.module.scss';

export default function HomePage() {
	return (
		<div>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://docs.kelvininc.com/">Kelvin</a> +{' '}
					<a href="https://nextjs.org">Next.js!</a>
				</h1>

				<p className={styles.description}>
					The following sample pages show you how to interact with the various Kelvin
					APIs:
				</p>

				<div className={styles.grid}>
					<Link href="/nodes" className={styles.card}>
						<h2>Nodes &rarr;</h2>
						<p>
							A Kelvin Node is your gateway from your local installations where your
							assets are to the Kelvin Platform Server.
						</p>
					</Link>
					<Link href="/assets" className={styles.card}>
						<h2>Assets &rarr;</h2>
						<p>
							A Kelvin Asset is any single piece of machinery, computer, PLC,
							historian or any type of group of data that generates data.
						</p>
					</Link>
					<Link href="/asset-cache" className={styles.card}>
						<h2>Asset Cache &rarr;</h2>
						<p>
							The asset cache is a high-speed intermediary API that allows for quick
							retrieval of associated metric values, alarms, and data labels with a
							single query.
						</p>
					</Link>
				</div>
			</main>
		</div>
	);
}
