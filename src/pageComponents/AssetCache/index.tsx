'use client';

import { MetricItem } from '@kelvininc/web-client-sdk';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import { FC, useMemo } from 'react';

import styles from './AssetCache.module.scss';

import { useDataCacheApi } from '@/api/DataCacheApi/hooks/useDataCacheApi';
import { useDataCacheApiPagination } from '@/api/DataCacheApi/hooks/useDataCacheApiPagination';
import { CachedAssetItem, QueryResponse } from '@/api/DataCacheApi/types';

type AssetCachePageProps = {
	paginatedAssets: QueryResponse<CachedAssetItem>;
	allMetrics: MetricItem[];
};

const staticColumns: GridColDef[] = [
	{
		field: 'title',
		headerName: 'Title',
		width: 300,
		filterable: false,
		disableColumnMenu: true
	},
	{
		field: 'assetTypeTitle',
		headerName: 'Type',
		width: 150,
		filterable: false,
		disableColumnMenu: true
	},
	{
		field: 'status.state',
		headerName: 'Status',
		width: 150,
		filterable: false,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams<unknown, CachedAssetItem>) => {
			return startCase(camelCase(params.row.status.state));
		}
	}
];

export const AssetsCachePage: FC<AssetCachePageProps> = ({ paginatedAssets, allMetrics }) => {
	const dataCacheApi = useDataCacheApi();
	const paginator = useDataCacheApiPagination<CachedAssetItem>({
		initialResponse: paginatedAssets,
		dataFetcher: async ({ page, limit, sort, sortDirection }) => {
			const cachedAssets = await dataCacheApi.getCachedAssets({
				page,
				limit,
				sort,
				sortDirection
			});
			return cachedAssets;
		}
	});

	const columns = useMemo(() => {
		const metricColumns = allMetrics.map((metric) => {
			const dynamicColumn: GridColDef = {
				field: `metricValues.${metric.name}`,
				headerName: startCase(camelCase(metric.title)),
				width: 300,
				filterable: false,
				disableColumnMenu: true,
				valueGetter: (params: GridValueGetterParams<unknown, CachedAssetItem>) => {
					return params.row.metricValues[metric.name] as unknown;
				}
			};
			return dynamicColumn;
		});
		return [...staticColumns, ...metricColumns];
	}, [allMetrics]);

	return (
		<div className={styles.AssetCachePage}>
			<DataGrid
				autoHeight
				paginationMode="server"
				sortingMode="server"
				loading={paginator.isLoading}
				rows={paginator.value?.items || []}
				rowCount={paginator.value?.total || 0}
				columns={columns}
				rowsPerPageOptions={[5, 10, 25, 50]}
				page={paginator.value?.page ? paginator.value.page - 1 : 0}
				pageSize={paginator.value?.limit}
				getRowId={(asset: CachedAssetItem) => asset.name}
				disableSelectionOnClick
				onPageChange={(newPage) => paginator.onPageChange(newPage + 1)}
				onPageSizeChange={paginator.onPageSizeChange}
				sortModel={
					paginator.value?.sort
						? [{ field: paginator.value.sort, sort: paginator.value.sortDirection }]
						: []
				}
				onSortModelChange={([sortItem]) => {
					if (!sortItem) {
						paginator.onSortChange(undefined, undefined);
						return;
					}
					paginator.onSortChange(sortItem.field, sortItem.sort || 'asc');
				}}
			/>
		</div>
	);
};
