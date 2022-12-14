'use client';

import { ACPItem, ACPService, IPaginationParams } from '@kelvininc/web-client-sdk';
import { FC } from 'react';

import { usePaginator } from '@/hooks/usePaginator';
import { SerializedPaginator } from '@/utils/pagination/serializePaginator';

interface NodeListPageProps {
	ssrPaginator: SerializedPaginator<ACPItem, IPaginationParams>;
}

export const NodesListPage: FC<NodeListPageProps> = ({ ssrPaginator }) => {
	const paginator = usePaginator({
		request: ACPService.listACP,
		requestOptions: ssrPaginator.requestParams,
		ssrPaginator
	});

	return (
		<>
			<table>
				<tbody>
					<tr>
						<td>Node Name</td>
						<td>Node Title</td>
						<td>Node Status</td>
					</tr>
					{paginator.items.map((node) => (
						<tr key={node.name}>
							<td>{`${node.name}`}</td>
							<td>{`${node.title}`}</td>
							<td>{`${node.status.state}`}</td>
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
