import { BaseApi } from '@src/store/api/baseApi.ts';
import { getSecurity } from '@src/api/endpoints/security/security.ts';
import { getUser } from '@src/api/endpoints/user/user.ts';
import { logout, setCurrentUser } from '@src/store/slices/userSlice.ts';
import type { UserLoginRequest, UserRegistrationRequest } from '@src/api/models';

const securityApi = getSecurity();
const userApi = getUser();

export const userService = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      queryFn: async (request: UserLoginRequest) => {
        try {
          const data = await securityApi.login(request);

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    register: build.mutation({
      queryFn: async (request: UserRegistrationRequest) => {
        try {
          const data = await securityApi.register(request);

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),

    getCurrentUserProfile: build.query({
      queryFn: async (_, { dispatch }) => {
        try {
          const data = await userApi.getCurrentUserProfile();
          dispatch(setCurrentUser(data));

          return { data };
        } catch (error) {
          dispatch(logout());
          return { error };
        }
      },
    }),

    logout: build.mutation({
      queryFn: async (_, { dispatch }) => {
        try {
          const data = await securityApi.logout();
          dispatch(logout());

          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetCurrentUserProfileQuery,
  useLazyGetCurrentUserProfileQuery,
  useLogoutMutation,
  useLoginMutation,
  useRegisterMutation,
} = userService;
