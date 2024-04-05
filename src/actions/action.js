import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        fetchPost: (state, action) => {
            state.posts = action.payload;
        }
    },
});

export const { addPost,fetchPost } = postSlice.actions;
export default postSlice.reducer;