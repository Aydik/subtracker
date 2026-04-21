import { BaseApi } from '@src/store/api/baseApi.ts';
import { getSubscriptions } from '@src/api/endpoints/subscriptions/subscriptions.ts';
import type { CreateSubscriptionRequest, GetServicesParams } from '@src/api/models';

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

    getServices: build.query({
      queryFn: async (request: GetServicesParams) => {
        try {
          const data = await subscriptionsApi.getServices(request);

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    createSubscription: build.mutation({
      queryFn: async (request: CreateSubscriptionRequest) => {
        try {
          const data = await subscriptionsApi.createSubscription(request);

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery, useGetServicesQuery, useCreateSubscriptionMutation } =
  subscriptionService;
