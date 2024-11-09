import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../redux/api/authSlice';
import { fetchUserSlice } from './api/fetchUserSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [fetchUserSlice.reducerPath]: fetchUserSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, fetchUserSlice.middleware),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;