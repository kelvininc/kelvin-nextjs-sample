'use client';

import { signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect } from 'react';
import urlJoin from 'url-join';

export default function Signin() {
	const { status } = useSession();
	const params = useSearchParams();

	useEffect(() => {
		const callbackUrl = params.get('callbackUrl');
		if (callbackUrl) {
			const qs = queryString.stringify({ callbackUrl });
			signOut({ callbackUrl: urlJoin('/signin', `?${qs}`) });
			return;
		}
		signOut({ callbackUrl: '/signin' });
	}, [status]);

	return null;
}
