import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authSlice";
import { jobSeekerApi } from "./api/jobseekerSlice";

export const store = configureStore({
  reducer: {
    // Add the authApi reducer to the store
    [authApi.reducerPath]: authApi.reducer,
    [jobSeekerApi.reducerPath]: jobSeekerApi.reducer,
  },
  // Adding the authApi middleware to enable caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, jobSeekerApi.middleware),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
