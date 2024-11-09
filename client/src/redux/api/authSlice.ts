import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
  role: 'jobseeker' | 'company';
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3003/api/v1/auth/login',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
