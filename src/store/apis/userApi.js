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
            provideTags:['User']
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/users/update-user',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['User']
        }),
    }),
});
export const { useGetUserQuery,useUpdateUserMutation } = userApi;