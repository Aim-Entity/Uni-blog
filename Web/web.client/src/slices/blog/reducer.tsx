import { createSlice } from "@reduxjs/toolkit";
import { allBlogs } from "../thunks";

export const initialState = {
  blogDraft: {},
  blogs: [],
  blogsLoading: true

};

const BlogSlice  = createSlice({
  name: "blog",
  initialState,
  reducers: {
    CreateBlog(state, action) {
      state.blogDraft = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allBlogs.fulfilled, (state: any, action: any) => {
        state.blogs = action.payload;
        state.blogsLoading = false;
    });
    builder.addCase(allBlogs.pending, (state: any) => {
        state.blogsLoading = true;
    });
    builder.addCase(allBlogs.rejected, (state: any, action: any) => {
        state.error = action.payload.error || null;
        state.blogsLoading = false;
    });
  }
});

export const {
  CreateBlog,
} = BlogSlice.actions

export default BlogSlice.reducer;