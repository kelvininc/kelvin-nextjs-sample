import {
	AlarmItem,
	AssetItem,
	DataLabelItem,
	MetricItem,
	StorageData
} from '@kelvininc/node-client-sdk';

export type SortDirection = 'asc' | 'desc';

export type QueryRequest = {
	page?: number;
	limit?: number;
	sort?: string;
	sortDirection?: SortDirection;
};

export type QueryResponse<T> = {
	items: T[];
	total: number;
	page?: number;
	offset?: number;
	limit?: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	totalPages?: number | null;
	prevPage?: number | null;
	nextPage?: number | null;
	pagingCounter: number;
	sort?: string;
	sortDirection?: SortDirection;
};

export type MetricInfoValue = {
	storageData: StorageData;
	metric: MetricItem;
};

export type CachedAssetItem = {
	metricInfo: Record<string, MetricInfoValue>;
	metricValues: Record<string, unknown>;
	totalMetrics: number;
	latestAlarms: AlarmItem[];
	dataLabels: DataLabelItem[];
} & AssetItem;
