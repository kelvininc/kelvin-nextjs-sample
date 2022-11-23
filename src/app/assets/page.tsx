import 'server-only';

import { AssetService } from '@kelvininc/node-client-sdk';

import * as KelvinNodeSDK from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth';

import { AssetsListPage } from '@/pageComponents/AssetsList';
import { NUMBER_OF_ASSETS } from '@/pageComponents/AssetsList/config';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirectToSignInPage } from '@/utils/navigation/redirectToSignInPage';
import { toPlainObject } from '@/utils/object/toPlainObject';

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
	const paginator = AssetService.getPaginator(
		AssetService.listAsset({
			pageSize: NUMBER_OF_ASSETS
		})
	);
	paginator.fetch();
	const response: KelvinNodeSDK.IPaginatedDataStream<KelvinNodeSDK.AssetItem> = await new Promise(
		(resolve) => {
			paginator.onDataReceived.subscribe((data) => {
				resolve(data);
			});
		}
	);
	return <AssetsListPage assets={toPlainObject(response.data)} />;
}
