import '@kelvininc/react-ui-components/assets/fonts/font-proxima-nova.css';
import '@kelvininc/react-ui-components/assets/styles/globals.scss';
import '@/app/globals.scss';
import * as KelvinNodeSDK from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth/next';

import { Header } from '@/components/Header';
import { KelvinSDKProvider } from '@/components/KelvinSDKProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Env } from '@/utils/env';

const API_URL = Env.getString('NEXT_PUBLIC_API_URL');

KelvinNodeSDK.KelvinSDK.initialize({
	baseUrl: API_URL
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await unstable_getServerSession(authOptions);

	return (
		<KelvinSDKProvider baseUrl={API_URL} session={session}>
			<html>
				<head />
				<body className="kv-proxima-nova">
					<Header />
					{children}
				</body>
			</html>
		</KelvinSDKProvider>
	);
}
