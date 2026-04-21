import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubscriptionResponse } from '@src/api/models';

interface SubscriptionsState {
  subscriptions: SubscriptionResponse[] | null;
}

const initialState: SubscriptionsState = {
  subscriptions: null,
};

export const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<SubscriptionsState['subscriptions']>) => {
      state.subscriptions = action.payload;
    },
  },
});

export const { setSubscriptions } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
