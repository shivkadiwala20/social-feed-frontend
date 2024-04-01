import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => {
        console.log({user})
       return {
        url: '/sign-up',
        method: 'POST',
        body: user,
       }
      },
      inValidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body:user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
