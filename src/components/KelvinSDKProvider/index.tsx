'use client';

import 'client-only';
import KelvinSDK from '@kelvininc/web-client-sdk';

import axios from 'axios';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { FC } from 'react';

import { Env, inBrowser } from '@/utils/env';

if (inBrowser()) {
	console.log('NEXT_PUBLIC_API_URL', Env.getString('NEXT_PUBLIC_API_URL'));
	KelvinSDK.initialize(
		{
			baseUrl: Env.getString('NEXT_PUBLIC_API_URL')
		},
		axios
	);
}

interface KelvinSDKProviderProps {
	session: Session | null;
	children: React.ReactNode;
}

export const KelvinSDKProvider: FC<KelvinSDKProviderProps> = ({ children, session }) => {
	if (session) {
		KelvinSDK.setSessionConfiguration({
			accessToken: session.token.accessToken as string,
			refreshToken: session.token.refreshToken
		});
	}
	return <SessionProvider session={session}>{children}</SessionProvider>;
};
