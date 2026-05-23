import { customAxios } from '@src/api/axiosInstance.ts';

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';

export const baseQuery: BaseQueryFn = async (config: AxiosRequestConfig) => {
  return customAxios(config);
};
