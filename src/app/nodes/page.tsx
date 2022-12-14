import 'server-only';

import { ACPService } from '@kelvininc/node-client-sdk';

import * as KelvinNodeSDK from '@kelvininc/node-client-sdk';
import { unstable_getServerSession } from 'next-auth';

import { NodesListPage } from '@/pageComponents/NodeList';
import { NUMBER_OF_NODES } from '@/pageComponents/NodeList/config';
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

	const paginator = new KelvinNodeSDK.KvPaginationHandler(ACPService.listACP, {
		pageSize: NUMBER_OF_NODES
	});

	paginator.fetch();
	const response: KelvinNodeSDK.IPaginationDataStream<KelvinNodeSDK.ACPItem> = await new Promise(
		(resolve) => {
			paginator.getDataStream().subscribe((data) => {
				resolve(data);
			});
		}
	);
	return <NodesListPage ssrPaginator={serializePaginator(paginator, response.data)} />;
}
