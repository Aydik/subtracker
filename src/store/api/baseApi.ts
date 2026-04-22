import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const BaseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
});
