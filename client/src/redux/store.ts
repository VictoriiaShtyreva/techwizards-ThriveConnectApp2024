import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../redux/api/authSlice';

export const store = configureStore({
  reducer: {
    // Add the authApi reducer to the store
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the authApi middleware to enable caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;