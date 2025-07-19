//Include Both Helper File with needed methods
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postBlogCreate, getAllBlogs
} from "../../helpers/fakebackend_helper";

export const createBlog = (blog : any, history : any) => async () => {
  try {
    let response;

    response = await postBlogCreate(blog);

    history('/')
  } catch (error) {
    console.log(error);
  }
};

export const allBlogs = createAsyncThunk("dashboardMVP/allBlogs", async () => {
    try{
        let response;
        response = await getAllBlogs();
        return response;
    }
    catch (error){
        return error;
    }
});