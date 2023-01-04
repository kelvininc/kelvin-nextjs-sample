import '@/styles/app.scss';
import { KelvinSDK } from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth/next';

import { Header } from '@/components/Header';
import { KelvinSDKProvider } from '@/components/KelvinSDKProvider';
import { RecoilStateProvider } from '@/components/RecoilStateProvider';
import { InitialState } from '@/components/RecoilStateProvider/types';
import ThemeProvider from '@/components/ThemeProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Env } from '@/utils/env';

const API_URL = Env.getString('API_URL');
const DATA_CACHE_API_URL = Env.getString('DATA_CACHE_API_URL');

KelvinSDK.initialize({
	baseUrl: API_URL
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await unstable_getServerSession(authOptions);

	const initialState: InitialState = {
		dataCacheApiUrl: DATA_CACHE_API_URL
	};

	return (
		<RecoilStateProvider session={session} initialState={initialState}>
			<KelvinSDKProvider baseUrl={API_URL} session={session}>
				<ThemeProvider>
					<html>
						<head />
						<body className="kv-proxima-nova">
							<Header />
							{children}
						</body>
					</html>
				</ThemeProvider>
			</KelvinSDKProvider>
		</RecoilStateProvider>
	);
}
