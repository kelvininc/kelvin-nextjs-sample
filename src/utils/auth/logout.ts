import { redirect } from 'next/navigation';
import queryString from 'query-string';
import urlJoin from 'url-join';

type LogoutOptions = {
	callbackUrl?: string;
};

export function logout(options: LogoutOptions = {}): never {
	const { callbackUrl } = options;
	if (callbackUrl) {
		const qs = queryString.stringify({ callbackUrl });
		redirect(urlJoin('/signout', `?${qs}`));
	}
	redirect('/signout');
}
