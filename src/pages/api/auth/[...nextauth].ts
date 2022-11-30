import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import urlJoin from 'url-join';

import { KeycloakToken } from '@/types/NextAuth';
import { Env } from '@/utils/env';

const config = {
	clientId: Env.getString('KEYCLOAK_CLIENT_ID'),
	clientSecret: Env.getString('KEYCLOAK_CLIENT_SECRET'),
	issuer: urlJoin(Env.getString('KEYCLOAK_URL'), '/realms', Env.getString('KEYCLOAK_REALM')),
	authorization: { params: { scope: 'openid email profile' } }
};

export const authOptions: NextAuthOptions = {
	providers: [KeycloakProvider(config)],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.token = token as unknown as KeycloakToken;
			return session;
		}
	}
};
export default NextAuth(authOptions);
