import { KvPaginationHandler, MetricItem, MetricService } from '@kelvininc/node-client-sdk';

export const getAllMetrics = async () => {
	const paginator = new KvPaginationHandler(MetricService.listMetric, {
		pageSize: 1000
	});

	paginator.fetch();
	return await new Promise<MetricItem[]>((resolve, reject) => {
		const allMetrics: MetricItem[] = [];
		paginator.getDataStream().subscribe(async ({ data }) => {
			allMetrics.push(...data);
			if (!paginator.hasNext()) {
				resolve(allMetrics);
				return;
			}
			paginator.next();
		});
		paginator.getErrorStream().subscribe((error) => {
			reject(error);
		});
	});
};
