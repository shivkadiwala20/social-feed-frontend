import { apiInterFace } from './apiInterFace';

const postApi = apiInterFace.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (page) => {
        return {
          url: `/posts/get-feed-posts?page=${page}`,
          method: 'GET',
        };
      },
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (data) => {
        console.log('data', data);
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }

        return {
          url: '/posts/create-post',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Post'],
    }),

    getPostImage: builder.query({
      query: (postId) => {
        console.log('postId', postId);
        return {
          url: `/posts/get-feed-image?postId=${postId}`,
          method: 'GET',
        };
      },
      invalidatesTags: ['Post'],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useCreatePostMutation,
  useGetPostImageQuery,
} = postApi;
