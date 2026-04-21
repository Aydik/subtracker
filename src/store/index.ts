import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import subscriptionsReducer from './slices/subscriptionsSlice.ts';
import { BaseApi } from '@src/store/api/baseApi.ts';

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,

    user: userReducer,
    subscriptions: subscriptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'baseApi/executeQuery/fulfilled',
          'baseApi/executeQuery/rejected',
          'baseApi/executeMutation/fulfilled',
          'baseApi/executeMutation/rejected',
        ],
        ignoredPaths: [
          'baseApi.queries',
          'baseApi.mutations',
          'baseApi.provided',
          'baseApi.subscriptions',
        ],
        ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta', 'payload'],
      },
    }).concat(BaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
