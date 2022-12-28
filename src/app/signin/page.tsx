'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect } from 'react';
import urlJoin from 'url-join';

export default function Signin() {
	const router = useRouter();
	const { status } = useSession();
	const params = useSearchParams();

	useEffect(() => {
		const callbackUrl = params.get('callbackUrl');
		if (status === 'unauthenticated') {
			if (callbackUrl) {
				const qs = queryString.stringify({ callbackUrl });
				signIn('keycloak', { callbackUrl: urlJoin('/signin', `?${qs}`) });
				return;
			}
			signIn('keycloak');
			return;
		}
		if (callbackUrl) {
			router.push(callbackUrl);
		} else {
			router.push('/');
		}
	}, [status]);

	return null;
}
