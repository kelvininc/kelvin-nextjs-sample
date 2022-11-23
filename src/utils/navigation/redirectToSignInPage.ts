import { redirect } from 'next/navigation';

export const redirectToSignInPage = () => {
	redirect('/signin');
};
