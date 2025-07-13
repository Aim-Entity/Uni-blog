//Include Both Helper File with needed methods
import {
  postBlogCreate,
} from "../../helpers/fakebackend_helper";

export const createBlog = (blog : any, history : any) => async (dispatch : any) => {
  try {
    let response;

    response = await postBlogCreate(blog);

    // if (response) {
    //   sessionStorage.setItem("authUser", JSON.stringify(response));

    //   var finallogin : any = JSON.stringify(response);
    //   finallogin = JSON.parse(finallogin)
    //   response = finallogin.data;
    //   if (finallogin.status === "success") {
    //     dispatch(loginSuccess(response));
    //     history('/blog-list')
    //   } 
    //   else {
    //     dispatch(apiError(finallogin));
    //   }
    // }
  } catch (error) {
    dispatch(apiError(error));
  }
};