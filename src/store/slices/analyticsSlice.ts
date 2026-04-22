import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  AnalyticsSummaryResponse,
  CategoryAnalyticsResponse,
  UpcomingChargesResponse,
} from '@src/api/models';

interface AnalyticsState {
  totalSubscriptions: number;
  totalAmount: number;
  categories: CategoryAnalyticsResponse[];
  upcomingCharges?: UpcomingChargesResponse;
}

const initialState: AnalyticsState = {
  totalSubscriptions: 0,
  totalAmount: 0,
  categories: [],
  upcomingCharges: undefined,
};

export const analyticsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<AnalyticsSummaryResponse>) => {
      state.totalSubscriptions = action.payload.totalSubscriptions || 0;
      state.totalAmount = action.payload.totalSubscriptions || 0;
      state.categories = action.payload.categories || [];
      state.upcomingCharges = action.payload.upcomingCharges;
    },
  },
});

export const { setAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
