import { IPaginationParams, KvPaginationHandler, Model } from '@kelvininc/node-client-sdk';

import { toPlainObject } from '@/utils/object/toPlainObject';

export interface SerializedPaginator<T extends Model, K extends IPaginationParams> {
	items: T[];
	requestParams: K;
	previousPageParams: IPaginationParams;
	nextPageParams: IPaginationParams;
	hasPrevious: boolean;
	hasNext: boolean;
}

export const serializePaginator = <T extends Model, K extends IPaginationParams>(
	paginator: KvPaginationHandler<T, K>,
	items: T[]
): SerializedPaginator<T, K> => {
	const serializablePaginator = {
		items: toPlainObject(items),
		requestParams: paginator.requestParams,
		previousPageParams: paginator.previousPageParams,
		nextPageParams: paginator.nextPageParams,
		hasPrevious: paginator.hasPrevious(),
		hasNext: paginator.hasNext()
	};

	return serializablePaginator;
};
