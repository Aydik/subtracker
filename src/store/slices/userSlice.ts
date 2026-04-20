import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileResponse } from '@src/api/models';

interface userState {
  user: ProfileResponse | null;
  isAuthenticated: boolean;
}

const initialState: userState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<{ user: userState['user'] }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;
