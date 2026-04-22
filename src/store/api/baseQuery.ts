import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import { customAxios } from '@src/api/axiosInstance.ts';

export const baseQuery: BaseQueryFn = async (config: AxiosRequestConfig) => {
  return customAxios(config);
};
