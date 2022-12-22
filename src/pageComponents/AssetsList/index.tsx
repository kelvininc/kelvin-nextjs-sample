'use client';

import { AssetItem, AssetService, IPaginationParams } from '@kelvininc/web-client-sdk';
import { FC } from 'react';

import { usePaginator } from '@/hooks/usePaginator';
import { SerializedPaginator } from '@/utils/pagination/serializePaginator';

type AssetListPageProps = {
	ssrPaginator: SerializedPaginator<AssetItem, IPaginationParams>;
};

export const AssetsListPage: FC<AssetListPageProps> = ({ ssrPaginator }) => {
	const paginator = usePaginator({
		request: AssetService.listAsset,
		requestOptions: ssrPaginator.requestParams,
		ssrPaginator
	});

	return (
		<>
			<table>
				<tbody>
					<tr>
						<td>Asset Name</td>
						<td>Asset Title</td>
						<td>Asset Type</td>
					</tr>
					{paginator.items.map((asset) => (
						<tr key={asset.name}>
							<td>{`${asset.name}`}</td>
							<td>{`${asset.title}`}</td>
							<td>{`${asset.assetTypeTitle}`}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="paginator-buttons-container">
				{paginator.hasPrevious && (
					<button
						onClick={() => {
							paginator.previous();
						}}>
						Previous
					</button>
				)}
				{paginator.hasNext && (
					<button
						onClick={() => {
							paginator.next();
						}}>
						Next
					</button>
				)}
			</div>
		</>
	);
};
