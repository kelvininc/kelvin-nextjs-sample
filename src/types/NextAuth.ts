import 'next-auth';

export interface KeycloakToken {
	accessToken: string;
	refreshToken: string;
}

declare module 'next-auth' {
	interface Session {
		token: KeycloakToken;
	}
}
