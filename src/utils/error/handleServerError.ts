import { EKvHttpStatusCode } from '@kelvininc/node-client-sdk';

import { logout } from '@/utils/auth/logout';

type HandleServerErrorOptions = {
	callbackUrl?: string;
};

export function handleServerError(error: Error | any, options: HandleServerErrorOptions = {}) {
	const { callbackUrl } = options;
	if (error.status === EKvHttpStatusCode.UNAUTHORIZED) {
		logout({ callbackUrl });
	}
	throw error;
}
