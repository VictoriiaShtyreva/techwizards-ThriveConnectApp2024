import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authSlice";
import { feedbackApi } from "../redux/api/feedbackSlice";
import { jobSeekerApi } from "./api/jobseekerSlice";
import { companyApi } from "./api/companySlice";

export const store = configureStore({
  reducer: {
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobSeekerApi.reducerPath]: jobSeekerApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
  },
  // Adding the authApi middleware to enable caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      feedbackApi.middleware,
      authApi.middleware,
      jobSeekerApi.middleware,
      companyApi.middleware
    ),
});

// Export types for usage with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
