'use client';

import { AssetItem, AssetService } from '@kelvininc/web-client-sdk';
import { FC } from 'react';

import { usePaginator } from '@/hooks/usePaginator';
import { NUMBER_OF_ASSETS } from '@/pageComponents/AssetsList/config';

interface AssetListPageProps {
	assets: AssetItem[];
}

export const AssetsListPage: FC<AssetListPageProps> = ({ assets }) => {
	const paginator = usePaginator({
		initialItems: assets,
		getPaginator: () =>
			AssetService.getPaginator(
				AssetService.listAsset({
					pageSize: NUMBER_OF_ASSETS
				})
			)
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
