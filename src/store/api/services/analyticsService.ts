import { getAnalytics } from '@src/api/endpoints/analytics/analytics.ts';
import { BaseApi } from '@src/store/api/baseApi.ts';
import { setAnalytics } from '@src/store/slices/analyticsSlice.ts';

const analyticsApi = getAnalytics();

export const analyticsService = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query({
      queryFn: async (_, { dispatch }) => {
        try {
          const data = await analyticsApi.getSummary();

          dispatch(setAnalytics(data));

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsService;
