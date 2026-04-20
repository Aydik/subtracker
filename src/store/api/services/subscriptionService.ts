import { BaseApi } from '@src/store/api/baseApi.ts';
import { getSubscriptions } from '@src/api/endpoints/subscriptions/subscriptions.ts';

const subscriptionsApi = getSubscriptions();

export const subscriptionService = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      queryFn: async () => {
        try {
          const data = await subscriptionsApi.getCategories();

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = subscriptionService;
