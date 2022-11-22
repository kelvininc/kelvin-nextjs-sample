import '@kelvininc/react-ui-components/assets/fonts/font-proxima-nova.css';
import '@kelvininc/react-ui-components/assets/styles/globals.scss';
import '@/app/globals.scss';
import { unstable_getServerSession } from 'next-auth/next';

import { PublicEnvVariables } from '@/app/PublicEnvVariables';
import { Header } from '@/components/Header';
import { KelvinSDKProvider } from '@/components/KelvinSDKProvider';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await unstable_getServerSession(authOptions);
	return (
		<KelvinSDKProvider session={session}>
			<html>
				<head />
				<body className="kv-proxima-nova">
					<PublicEnvVariables />
					<Header />
					{children}
				</body>
			</html>
		</KelvinSDKProvider>
	);
}
