import { KvPaginator, Model } from '@kelvininc/web-client-sdk';
import { useEffect, useState } from 'react';

export const usePaginator = <T extends Model>(getPaginator: () => KvPaginator<T>) => {
	const [paginator, setPaginator] = useState<KvPaginator<T> | undefined>(undefined);
	const [items, setItems] = useState<T[]>([]);
	const [hasNext, setHasNext] = useState(false);
	const [hasPrevious, setHasPrevious] = useState(false);

	useEffect(() => {
		const pager = getPaginator();
		setPaginator(pager);
		const subscription = pager.onDataReceived.subscribe((data) => {
			setItems(data.data);
			setHasNext(!!pager?.hasNext());
			setHasPrevious(!!pager?.hasPrevious());
		});

		pager.fetch();

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
