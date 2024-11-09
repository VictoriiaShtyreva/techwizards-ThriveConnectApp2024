import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authSlice";
import { feedbackApi } from "../redux/api/feedbackSlice";
import { fetchUserSlice } from './api/fetchUserSlice';

export const store = configureStore({
  reducer: {
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [fetchUserSlice.reducerPath]: fetchUserSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(authApi.middleware, fetchUserSlice.middleware, feedbackApi.middleware),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
