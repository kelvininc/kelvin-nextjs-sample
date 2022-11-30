import 'server-only';

import { AssetService } from '@kelvininc/node-client-sdk';

import * as KelvinNodeSDK from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth';

import { AssetsListPage } from '@/pageComponents/AssetsList';
import { NUMBER_OF_ASSETS } from '@/pageComponents/AssetsList/config';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirectToSignInPage } from '@/utils/navigation/redirectToSignInPage';
import { serializePaginator } from '@/utils/pagination/serializePaginator';

export default async function Assets() {
	const session = await unstable_getServerSession(authOptions);
	if (!session) {
		redirectToSignInPage();
		return;
	}

	KelvinNodeSDK.setSession({
		accessToken: session.token.accessToken as string,
		refreshToken: session.token.refreshToken
	});

	const paginator = new KelvinNodeSDK.KvPaginationHandler(AssetService.listAsset, {
		pageSize: NUMBER_OF_ASSETS
	});

	paginator.fetch();
	const response: KelvinNodeSDK.IPaginationDataStream<KelvinNodeSDK.AssetItem> =
		await new Promise((resolve) => {
			paginator.getDataStream().subscribe((data) => {
				resolve(data);
			});
		});
	return <AssetsListPage ssrPaginator={serializePaginator(paginator, response.data)} />;
}
