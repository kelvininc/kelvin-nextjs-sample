'use client';

import 'client-only';

import KelvinWebSDK from '@kelvininc/web-client-sdk';

import axios from 'axios';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { FC } from 'react';

import { inBrowser } from '@/utils/env';

interface KelvinSDKProviderProps {
	baseUrl: string;
	session: Session | null;
	children: React.ReactNode;
}

export const KelvinSDKProvider: FC<KelvinSDKProviderProps> = ({ children, baseUrl, session }) => {
	if (session && inBrowser()) {
		KelvinWebSDK.initialize({ baseUrl: baseUrl }, axios);
		KelvinWebSDK.setSessionConfiguration({
			accessToken: session.token.accessToken as string,
			refreshToken: session.token.refreshToken
		});
	}
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
