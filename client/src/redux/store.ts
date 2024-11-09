import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authSlice";
import { jobSeekerApi } from "./api/jobseekerSlice";
import { companyApi } from "./api/companySlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [jobSeekerApi.reducerPath]: jobSeekerApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  // Adding the authApi middleware to enable caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      jobSeekerApi.middleware,
      companyApi.middleware
    ),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
