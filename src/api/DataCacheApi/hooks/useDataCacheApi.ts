import { useRecoilValue } from 'recoil';

import { dataCacheApiState } from '@/state/dataCacheApiState';

export const useDataCacheApi = () => {
	const dataCacheApi = useRecoilValue(dataCacheApiState);
	return dataCacheApi;
};
