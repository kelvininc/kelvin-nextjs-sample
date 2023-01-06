import { EKvHttpStatusCode } from '@kelvininc/node-client-sdk';

import { AxiosError } from 'axios';

import { logout } from '@/utils/auth/logout';

type HandleServerErrorOptions = {
	callbackUrl?: string;
};

type KelvinApiError = {
	status: number;
} & Error;

export function handleServerError(
	error: Error | KelvinApiError | AxiosError,
	options: HandleServerErrorOptions = {}
) {
	const { callbackUrl } = options;
	if (error instanceof AxiosError) {
		if (error.response?.status === EKvHttpStatusCode.UNAUTHORIZED) {
			logout({ callbackUrl });
		}
	}
	if ((error as KelvinApiError).status === EKvHttpStatusCode.UNAUTHORIZED) {
		logout({ callbackUrl });
	}
	throw error;
}
