// Temporary component to expose NEXT_PUBLIC_* env variables to the browser
// while the Next beta team re-implements this functionality in Next 13.
// TODO: monitor the progress of Next.js 13 and delete this file as soon as the functionality is implemented
import { inBrowser } from '@/utils/env';

export const ENV_VARIABLE_INPUT_ID = 'public_next_variables';

export const unstable__getPublicVariables = () => {
	if (!inBrowser()) {
		throw new Error('This function is only suitable for the browser');
	}
	const input = document.getElementById(ENV_VARIABLE_INPUT_ID) as HTMLInputElement;
	return JSON.parse(input.value);
};
