import 'server-only';

import {
	ACPItem,
	ACPService,
	IPaginationDataStream,
	KvPaginationHandler,
	setSession as setKelvinApiSession
} from '@kelvininc/node-client-sdk';

import { unstable_getServerSession } from 'next-auth';

import { NodesListPage } from '@/pageComponents/NodeList';
import { NUMBER_OF_NODES } from '@/pageComponents/NodeList/config';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { logout } from '@/utils/auth/logout';
import { handleServerError } from '@/utils/error/handleServerError';
import { serializePaginator } from '@/utils/pagination/serializePaginator';

export default async function Assets() {
	try {
		const session = await unstable_getServerSession(authOptions);
		if (!session) {
			logout({ callbackUrl: '/nodes' });
		}

		setKelvinApiSession({
			accessToken: session.token.accessToken as string,
			refreshToken: session.token.refreshToken
		});

		const paginator = new KvPaginationHandler(ACPService.listACP, {
			pageSize: NUMBER_OF_NODES
		});

		paginator.fetch();
		const response: IPaginationDataStream<ACPItem> = await new Promise((resolve, reject) => {
			paginator.getDataStream().subscribe((data) => {
				resolve(data);
			});
			paginator.getErrorStream().subscribe((error) => {
				reject(error);
			});
		});
		return <NodesListPage ssrPaginator={serializePaginator(paginator, response.data)} />;
	} catch (e) {
		handleServerError(e, { callbackUrl: '/nodes' });
	}
}
