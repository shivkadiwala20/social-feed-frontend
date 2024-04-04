// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiInterFace } from './apiInterFace';

export const authApi = apiInterFace.injectEndpoints({
  // reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => {
        //console.log({user})
        return {
          url: '/sign-up',
          method: 'POST',
          body: user,
        };
      },
      inValidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
