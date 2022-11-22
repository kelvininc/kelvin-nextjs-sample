import Keycloak from 'keycloak-js';

import { Env } from '@/utils/env';

export const keycloak = new Keycloak({
	clientId: Env.getString('NEXT_PUBLIC_KEYCLOAK_CLIENT_ID') || 'kelvin-admin-tool',
	realm: Env.getString('NEXT_PUBLIC_KEYCLOAK_REALM') || 'kelvin',
	url: Env.getString('NEXT_PUBLIC_KEYCLOAK_URL') || 'https://alpha.kelvininc.com/auth'
});
