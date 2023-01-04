import axios, { AxiosInstance } from 'axios';

import { CachedAssetItem, QueryRequest, QueryResponse } from '@/api/DataCacheApi/types';

type DataCacheApiOptions = {
	baseUrl: string;
	accessToken: string;
	refreshToken?: string;
};

export class DataCacheApi {
	private axiosInstance: AxiosInstance;

	constructor(options: DataCacheApiOptions) {
		const { baseUrl, accessToken } = options;

		this.axiosInstance = axios.create({
			baseURL: baseUrl,
			headers: { Authorization: `Bearer ${accessToken}` }
		});
	}

	async getCachedAssets(queryRequest: QueryRequest) {
		const res = await this.axiosInstance.get<QueryResponse<CachedAssetItem>>(
			'/asset-cache/assets',
			{
				params: queryRequest
			}
		);

		return res.data;
	}
}
