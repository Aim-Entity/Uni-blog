import { createSlice } from "@reduxjs/toolkit";
import { allCommentsWithBlogId } from "./thunk";

export const initialState = {
  comments: []
};

const CommentSlice  = createSlice({
  name: "comment",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(allCommentsWithBlogId.fulfilled, (state: any, action: any) => {
        state.comments = action.payload;
    });
    builder.addCase(allCommentsWithBlogId.rejected, (state: any, action: any) => {
        state.comments = action.payload.error || null;
    });
  }
});

export const {
} = CommentSlice.actions

export default CommentSlice.reducer;