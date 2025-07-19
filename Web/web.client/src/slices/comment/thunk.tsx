//Include Both Helper File with needed methods
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommentsWithBlogid
} from "../../helpers/fakebackend_helper";

export const allCommentsWithBlogId = createAsyncThunk("dashboardMVP/allCommentsWithBlogId", async (data: {blogId: number}) => {
    try{
        let response;
        response = await getAllCommentsWithBlogid(data.blogId);
        return response;
    }
    catch (error){
        return error;
    }
});

export const createComment = (comment : any) => async () => {
  try {
    let response;
    response = await postBlogCreate(blog);

  } catch (error) {
    console.log(error);
  }
};