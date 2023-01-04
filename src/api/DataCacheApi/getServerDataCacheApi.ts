import 'server-only';
import { Session } from 'next-auth';

import { DataCacheApi } from '@/api/DataCacheApi/DataCacheApi';
import { Env } from '@/utils/env';

const DATA_CACHE_API_URL = Env.getString('DATA_CACHE_API_URL');

export const getServerDataCacheApi = (session: Session) => {
	return new DataCacheApi({
		baseUrl: DATA_CACHE_API_URL,
		accessToken: session.token.accessToken
	});
};
