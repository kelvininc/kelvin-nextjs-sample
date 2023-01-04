'use client';
import 'client-only';

import { Session } from 'next-auth';

import { FC } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { DataCacheApi } from '@/api/DataCacheApi/DataCacheApi';
import { InitialState } from '@/components/RecoilStateProvider/types';
import { dataCacheApiState } from '@/state/dataCacheApiState';

type RecoilStateProviderProps = {
	session: Session | null;
	children: React.ReactNode;
	initialState: InitialState;
};

export const RecoilStateProvider: FC<RecoilStateProviderProps> = ({
	session,
	initialState,
	children
}) => {
	const initStatus = ({ set }: MutableSnapshot) => {
		const { dataCacheApiUrl } = initialState;
		if (session) {
			set(
				dataCacheApiState,
				new DataCacheApi({
					baseUrl: dataCacheApiUrl,
					accessToken: session.token.accessToken
				})
			);
		}
	};
	return <RecoilRoot initializeState={initStatus}>{children}</RecoilRoot>;
};
