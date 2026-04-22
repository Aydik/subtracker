import { BaseApi } from '@src/store/api/baseApi.ts';
import { getSubscriptions } from '@src/api/endpoints/subscriptions/subscriptions.ts';
import type {
  CreateSubscriptionRequest,
  GetServicesParams,
  GetSubscriptionsParams,
  UpdateSubscriptionRequest,
} from '@src/api/models';

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

    getSubscriptions: build.query({
      queryFn: async (request: GetSubscriptionsParams) => {
        try {
          const data = await subscriptionsApi.getSubscriptions(request);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    getSubscriptionById: build.query({
      queryFn: async (id: string) => {
        try {
          const data = await subscriptionsApi.getSubscriptionById(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    deleteSubscription: build.mutation({
      queryFn: async (id: string) => {
        try {
          const data = await subscriptionsApi.deleteSubscription(id);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    updateSubscription: build.mutation({
      queryFn: async (request: {
        id: string;
        updateSubscriptionRequest: UpdateSubscriptionRequest;
      }) => {
        try {
          const data = await subscriptionsApi.updateSubscription(
            request.id,
            request.updateSubscriptionRequest,
          );
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetServicesQuery,
  useLazyGetSubscriptionsQuery,
  useLazyGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionService;
