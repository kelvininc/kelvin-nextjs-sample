'use client';

import 'client-only';
import KelvinSDK from '@kelvininc/web-client-sdk';

import { ReactKeycloakProvider } from '@react-keycloak/web';

import axios from 'axios';
import { useState } from 'react';

import { keycloak } from '@/components/KelvinSDKProvider/keycloak';

import { Env } from '@/utils/env';

KelvinSDK.initialize(
	{
		baseUrl: Env.getString('NEXT_API_URL') || `https://alpha.kelvininc.com/api/v4`
	},
	axios
);

export const KelvinSDKProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
		<ReactKeycloakProvider
			authClient={keycloak}
			initOptions={{
				onLoad: 'login-required',
				checkLoginIframe: false,
				loadUserProfileAtStartUp: false,
				bearerExcludedUrls: []
			}}
			onTokens={(tokens) => {
				KelvinSDK.setSessionConfiguration({
					accessToken: tokens.token as string,
					refreshToken: tokens.refreshToken
				});
				setIsAuthenticated(true);
			}}>
			{isAuthenticated && children}
		</ReactKeycloakProvider>
	);
};
