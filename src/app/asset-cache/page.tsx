import 'server-only';

import { setSession as setKelvinApiSession } from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth';

import { getServerDataCacheApi } from '@/api/DataCacheApi/getServerDataCacheApi';
import { AssetsCachePage } from '@/pageComponents/AssetCache';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { logout } from '@/utils/auth/logout';
import { handleServerError } from '@/utils/error/handleServerError';
import { getAllMetrics } from '@/utils/kelvin-sdk/getAllMetrics';

export default async function AssetCache() {
	try {
		const session = await unstable_getServerSession(authOptions);
		if (!session) {
			logout({ callbackUrl: '/asset-cache' });
		}

		setKelvinApiSession({
			accessToken: session.token.accessToken as string,
			refreshToken: session.token.refreshToken
		});

		const allMetrics = await getAllMetrics();

		const dataCacheApi = getServerDataCacheApi(session);

		const paginatedAssets = await dataCacheApi.getCachedAssets({
			page: 1,
			limit: 5
		});

		return <AssetsCachePage allMetrics={allMetrics} paginatedAssets={paginatedAssets} />;
	} catch (e) {
		handleServerError(e, { callbackUrl: '/asset-cache' });
	}
}
