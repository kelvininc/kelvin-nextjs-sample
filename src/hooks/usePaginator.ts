import {
	IPaginationParams,
	KvPaginationHandler,
	Model,
	PaginatorRequest
} from '@kelvininc/web-client-sdk';
import { useEffect, useState } from 'react';

import { SerializedPaginator } from '@/utils/pagination/serializePaginator';

interface UsePaginatorOptions<T extends Model, K extends IPaginationParams> {
	request: PaginatorRequest<T, K>;
	requestOptions: K;
	ssrPaginator?: SerializedPaginator<T, K>;
}

export const usePaginator = <T extends Model, K extends IPaginationParams>({
	request,
	requestOptions,
	ssrPaginator
}: UsePaginatorOptions<T, K>) => {
	const [paginator, setPaginator] = useState<KvPaginationHandler<T, K> | undefined>(undefined);
	const [items, setItems] = useState<T[]>(ssrPaginator?.items || []);
	const [hasNext, setHasNext] = useState(ssrPaginator?.hasNext);
	const [hasPrevious, setHasPrevious] = useState(ssrPaginator?.hasPrevious);

	useEffect(() => {
		const pager = new KvPaginationHandler(request, requestOptions);
		if (ssrPaginator) {
			if (ssrPaginator.nextPageParams) {
				pager.nextPageParams = ssrPaginator.nextPageParams;
			}
			if (ssrPaginator.previousPageParams) {
				pager.previousPageParams = ssrPaginator.previousPageParams;
			}
		}

		setPaginator(pager);

		const subscription = pager.getDataStream().subscribe((data) => {
			setItems(data.data);
			setHasNext(!!pager?.hasNext());
			setHasPrevious(!!pager?.hasPrevious());
		});

		if (!ssrPaginator) {
			pager.fetch();
		}

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return {
		items,
		next: () => paginator?.next(),
		previous: () => paginator?.previous(),
		hasNext,
		hasPrevious
	};
};
