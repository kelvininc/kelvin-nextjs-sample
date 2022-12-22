import 'next-auth';

export type KeycloakToken = {
	accessToken: string;
	refreshToken: string;
};

declare module 'next-auth' {
	interface Session {
		token: KeycloakToken;
	}
}
