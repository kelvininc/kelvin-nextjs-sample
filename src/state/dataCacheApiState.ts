import { atom } from 'recoil';

import { DataCacheApi } from '@/api/DataCacheApi/DataCacheApi';

export const dataCacheApiState = atom<DataCacheApi>({
	key: 'dataCacheApiState',
	default: undefined
});
