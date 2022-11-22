import '@kelvininc/react-ui-components/assets/fonts/font-proxima-nova.css';
import '@kelvininc/react-ui-components/assets/styles/globals.scss';
import '@/app/globals.scss';

import { KelvinSDKProvider } from '@/components/KelvinSDKProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<KelvinSDKProvider>
			<html>
				<head />
				<body className="kv-proxima-nova">{children}</body>
			</html>
		</KelvinSDKProvider>
	);
}
