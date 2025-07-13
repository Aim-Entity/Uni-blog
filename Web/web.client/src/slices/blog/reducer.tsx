import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  blogDraft: {},
};

const BlogSlice  = createSlice({
  name: "blog",
  initialState,
  reducers: {
    CreateBlog(state, action) {
      state.blogDraft = action.payload.data;
    },
  },
});

export const {
  CreateBlog,
} = BlogSlice.actions

export default BlogSlice.reducer;