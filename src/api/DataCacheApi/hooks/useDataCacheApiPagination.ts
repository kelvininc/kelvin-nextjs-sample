import { useCallback, useEffect, useState } from 'react';

import { QueryRequest, QueryResponse, SortDirection } from '@/api/DataCacheApi/types';

type QueryResponseFetcher<T> = (queryRequest: QueryRequest) => Promise<QueryResponse<T>>;

export interface UsePaginationOptions<T> {
	initialResponse?: QueryResponse<T>;
	dataFetcher: QueryResponseFetcher<T>;
}

export const useDataCacheApiPagination = <T>(options: UsePaginationOptions<T>) => {
	const { initialResponse, dataFetcher } = options;
	const [hadInitialData] = useState(initialResponse ? true : false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [fetchCount, setFetchCount] = useState(0);
	const [value, setValue] = useState(initialResponse);
	const [page, setPage] = useState(initialResponse?.page || 1);
	const [limit, setLimit] = useState(initialResponse?.limit || 10);
	const [refreshBit, setRefreshBit] = useState(false);
	const [sort, setSort] = useState(initialResponse?.sort);
	const [sortDirection, setSortDirection] = useState(initialResponse?.sortDirection);

	useEffect(() => {
		if (hadInitialData && !fetchCount) {
			setFetchCount(fetchCount + 1);
			return;
		}
		const loadData = async () => {
			try {
				setIsLoading(true);
				const paginationResult = await dataFetcher({
					page,
					limit,
					sort,
					sortDirection
				});
				setValue(paginationResult);
			} catch (e) {
				const err = e as Error;
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
		setFetchCount(fetchCount + 1);
	}, [refreshBit, page, limit, sort, sortDirection]);

	const onPageChange = (newPage: number) => {
		setPage(newPage);
	};
	const onPageSizeChange = (newLimit: number) => {
		setLimit(newLimit);
	};
	const onSortChange = (field: string | undefined, direction: SortDirection | undefined) => {
		setSort(field);
		setSortDirection(direction);
	};

	const refresh = useCallback(() => {
		setRefreshBit(!refreshBit);
	}, [refreshBit]);

	const next = () => {
		if (!value?.hasNextPage) {
			return;
		}
		setPage(page + 1);
	};

	const previous = () => {
		if (!value?.hasPrevPage) {
			return;
		}
		setPage(page - 1);
	};

	return {
		isLoading,
		page,
		limit,
		value,
		error,
		refresh,
		onPageChange,
		onPageSizeChange,
		onSortChange,
		next,
		previous
	};
};
