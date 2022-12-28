import 'server-only';

import {
	AssetItem,
	AssetService,
	IPaginationDataStream,
	KvPaginationHandler,
	setSession as setKelvinApiSession
} from '@kelvininc/node-client-sdk';

import { unstable_getServerSession } from 'next-auth';

import { AssetsListPage } from '@/pageComponents/AssetsList';
import { NUMBER_OF_ASSETS } from '@/pageComponents/AssetsList/config';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { logout } from '@/utils/auth/logout';
import { handleServerError } from '@/utils/error/handleServerError';
import { serializePaginator } from '@/utils/pagination/serializePaginator';

export default async function Assets() {
	try {
		const session = await unstable_getServerSession(authOptions);
		if (!session) {
			logout({ callbackUrl: '/assets' });
		}

		setKelvinApiSession({
			accessToken: session.token.accessToken as string,
			refreshToken: session.token.refreshToken
		});

		const paginator = new KvPaginationHandler(AssetService.listAsset, {
			pageSize: NUMBER_OF_ASSETS
		});

		paginator.fetch();
		const response: IPaginationDataStream<AssetItem> = await new Promise((resolve, reject) => {
			paginator.getDataStream().subscribe((data) => {
				resolve(data);
			});
			paginator.getErrorStream().subscribe((error) => {
				reject(error);
			});
		});
		return <AssetsListPage ssrPaginator={serializePaginator(paginator, response.data)} />;
	} catch (e) {
		handleServerError(e, { callbackUrl: '/assets' });
	}
}
