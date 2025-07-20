import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

import overview from "../../../assets/images/blog/overview.jpg"
import avatar from "../../../assets/images/users/user-dummy-img.jpg"
import SimpleBar from 'simplebar-react';
import { allBlogs, allCommentsWithBlogId } from '../../../slices/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import HorizontalLayout from '../../../Layouts/HorizontalLayout';
import { postCommentCreate } from '../../../helpers/fakebackend_helper';
import { GetUserId } from '../../../utils/UserCookies';
import Loader from '../../../Components/Common/Loader';

const BlogOverviewView = () => {
    const {blogId} = useParams()

    const dispatch = useDispatch<any>();

    const descriptionContainer = useRef(null);

    type blogType = {
        id: number,
        title: string,
        description: string,
        thumbnailImage: string | ArrayBuffer | null,
        status: boolean,
        author: string,
        authorName: string,
        dateCreated: string,
        isCommentsEnabled: boolean,
    }

    type commentType = {
        author: {
            email: string,
            firstName: string,
            lastName: string,
            id: string
        },
        dateCreated: string,
        message: string,
    }

    type commentDraftType = {
        authorId: string
        blogId: number
        message: string,
    }

    const [blogs, setBlogs] = useState<blogType[]>([]);
    const [currentBlog, setCurrentBlogs] = useState<blogType>();

    const [comments, setComments] = useState<commentType[]>([]);
    const [commentDraft, setCommentDraft] = useState<commentDraftType>({
        authorId: GetUserId(),
        blogId: Number(blogId),
        message: ""
    });

    const [blogsLoading, setBlogsLoading] = useState<boolean>(true);
    
    
    const selectBlogs = createSelector(
        (slice) => slice.Blog,
        (state) => state.blogs
    );

    const blogsData = useSelector(selectBlogs);

    const selectComments = createSelector(
        (slice) => slice.Comment,
        (state) => state.comments
    );

    const commentData = useSelector(selectComments);

    useEffect(() => {
        dispatch(allCommentsWithBlogId({blogId: Number(blogId)}));
    }, [dispatch, blogId]);
    
    const selectBlogsLoading = createSelector(
        (slice) => slice.Blog,
        (state) => state.blogsLoading
    );

    const blogsLoadingData = useSelector(selectBlogsLoading);

    useEffect(() => {
        setComments(commentData);
    }, [commentData]);

    useEffect(() => {
        dispatch(allBlogs());
    }, [dispatch]);

    useEffect(() => {
        setBlogs(blogsData);
    }, [blogsData]);

    useEffect(() => {
        let blog = blogs.find(blog => blog.id.toString() == blogId);
        if(blog)
        {
            blog = {...blog, description: blog.description.replace("<table>", '<table class="table">')};
        }

        setCurrentBlogs(blog);
    }, [blogs, blogId]);

    useEffect(() => {
        if(descriptionContainer.current) {
            descriptionContainer.current.innerHTML = currentBlog?.description;
        }
    }, [currentBlog]);

    useEffect(() => {
        setBlogsLoading(blogsLoadingData);
    }, [blogsLoadingData]);

    document.title = "Blog Overview";

    if(blogsLoading) {
      return (
        <React.Fragment>
            <div className='d-flex justify-content-center mt-4'>
                <Loader />
            </div>
        </React.Fragment>
      )  
    }

    return (
        <React.Fragment>
            <div className="">
                <Container fluid>
                    <HorizontalLayout />
                    <div className="row justify-content-center">
                        <div className="col-xxl-10">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <p className="text-success text-uppercase mb-2">Public Blog</p>
                                        <h4 className="mb-2">{currentBlog?.title}</h4>
                                        <p className="text-muted mb-4">{new Date(currentBlog?.dateCreated).toLocaleTimeString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
                                    </div>
                                    {currentBlog?.thumbnailImage && (
                                        <img src={currentBlog?.thumbnailImage} alt="" className="img-thumbnail w-50 mx-auto d-block"/>
                                    )}

                                    {!currentBlog?.thumbnailImage && (
                                        <img src={overview} alt="" className="img-thumbnail w-100" />                                    
                                    )}

                                    <div className="row mt-4">
                                        <div className="col-lg-3">
                                            <h6 className="pb-1">Contributor By:</h6>
                                            <div className="d-flex gap-2 mb-3">
                                                <div className="flex-shrink-0">
                                                     <img src={avatar} alt="" className="avatar-sm rounded" />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h5 className="mb-1">{currentBlog?.authorName}</h5>
                                                    <p className="mb-2">Blog Publisher</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div ref={descriptionContainer} id='description-container'>

                                            </div>
                                            <div>
                                                <h5 className="fw-semibold mb-3">Comments:</h5>
                                                {currentBlog?.isCommentsEnabled == true && (
                                                    <div>
                                                        <SimpleBar style={{maxHeight: "300px"}} className="px-3 mx-n3 mb-2">
                                                            {comments.map((item, idx) => (
                                                                <div className="d-flex mb-4">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={avatar} alt="" className="avatar-xs rounded-circle" />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h5 className="fs-13">{item.author.firstName} {item.author.lastName} <small className="text-muted ms-2">{new Date(item.dateCreated).toLocaleTimeString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</small></h5>
                                                                        <p className="text-muted">
                                                                            {item.message}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </SimpleBar>

                                                        <form className="mt-4" onSubmit={(e) => {
                                                            dispatch(postCommentCreate({blogId: commentDraft.blogId, authorId: commentDraft.authorId, message: commentDraft.message}));
                                                            location.reload()
                                                        }}>
                                                            <div className="row g-3">
                                                                <div className="col-12">
                                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-body">Leave a Comments</label>
                                                                    <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows={3} placeholder="Enter your comment..." 
                                                                    value={commentDraft?.message} 
                                                                    onChange={(e) => {
                                                                        setCommentDraft({...commentDraft, message: e.target.value});
                                                                    }}
                                                                    required></textarea>
                                                                </div>
                                                                <div className="col-12 text-end">
                                                                    <button type='submit' className="btn btn-success">Post Comments</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )}
                                                
                                                {currentBlog?.isCommentsEnabled == false && (
                                                    <h5>Comments Disabled</h5>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default BlogOverviewView