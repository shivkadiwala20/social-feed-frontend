// import {fetchBaseQuery}   from '@reduxjs/toolkit/query/react';
import { apiInterFace } from './apiInterFace';

export const userApi = apiInterFace.injectEndpoints({
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/users/get-user',
        method: 'GET',
      }),
      provideTags: ['User'],
    }),
    getAllUser: builder.query({
      query: () => ({
        url: '/users/get-all-user',
        method: 'GET',
      }),
      provideTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        //console.log('updateData', data);
        return {
          url: '/users/update-user',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `/users/delete-user`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
