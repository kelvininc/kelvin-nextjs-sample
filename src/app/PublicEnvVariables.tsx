// Temporary component to expose NEXT_PUBLIC_* env variables to the browser
// while the Next beta team re-implements this functionality in Next 13.
// TODO: monitor the progress of Next.js 13 and delete this file as soon as the functionality is implemented

import { inBrowser } from '@/utils/env';
import { ENV_VARIABLE_INPUT_ID } from '@/utils/env/unstable__getPublicVariables';
import 'server-only';

export const PublicEnvVariables = () => {
	const publicVariables = {} as Record<string, string | undefined>;
	const publicVariableKeys = Object.keys(process.env).filter((k) => k.startsWith('NEXT_PUBLIC_'));
	publicVariableKeys.forEach((k) => {
		publicVariables[k] = process.env[k];
	});

	return (
		<input
			id={ENV_VARIABLE_INPUT_ID}
			type="hidden"
			value={JSON.stringify(publicVariables)}></input>
	);
};

export const getPublicVariables = () => {
	if (!inBrowser()) {
		throw new Error('This function is only suitable for the browser');
	}
	return JSON.parse(document.getElementById(ENV_VARIABLE_INPUT_ID)?.nodeValue || '{}');
};
