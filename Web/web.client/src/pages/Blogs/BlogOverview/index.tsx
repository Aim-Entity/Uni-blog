import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

import overview from "../../../assets/images/blog/overview.jpg"
import avatar from "../../../assets/images/users/user-dummy-img.jpg"
import small4 from "../../../assets/images/small/img-4.jpg"
import SimpleBar from 'simplebar-react';
import { allBlogs } from '../../../slices/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

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

    }

    const [blogs, setBlogs] = useState<blogType[]>([]);
    const [currentBlog, setCurrentBlogs] = useState<blogType>();

    const selectBlogs = createSelector(
        (slice) => slice.Blog,
        (state) => state.blogs
    );

    const blogsData = useSelector(selectBlogs);

    useEffect(() => {
        dispatch(allBlogs());
    }, [dispatch]);

    useEffect(() => {
        setBlogs(blogsData);
    }, [blogsData]);

    useEffect(() => {
        setCurrentBlogs(blogs.find(blog => blog.id.toString() == blogId));
    }, [blogs, blogId]);

    useEffect(() => {
        descriptionContainer.current.innerHTML = currentBlog?.description;
    }, [currentBlog]);

    document.title = "Blog Overview";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="row justify-content-center">
                        <div className="col-xxl-10">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <p className="text-success text-uppercase mb-2">Art & Design</p>
                                        <h4 className="mb-2">{currentBlog?.title}</h4>
                                        <p className="text-muted mb-4">Public Blog</p>
                                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                                            <span className="badge bg-primary-subtle text-primary">CraftedPerspectives</span>
                                            <span className="badge bg-primary-subtle text-primary">DesignInspiration</span>
                                            <span className="badge bg-primary-subtle text-primary">ArtAndDesign</span>
                                        </div>
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
                                                <SimpleBar style={{height: "300px"}} className="px-3 mx-n3 mb-2">
                                                    <div className="d-flex mb-4">
                                                        <div className="flex-shrink-0">
                                                            <img src={avatar} alt="" className="avatar-xs rounded-circle" />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h5 className="fs-13">Joseph Parker <small className="text-muted ms-2">20 Dec 2021 - 05:47AM</small></h5>
                                                            <p className="text-muted">I am getting message from customers that when they place order always get error message .</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mb-4">
                                                        <div className="flex-shrink-0">
                                                            <img src={avatar} alt="" className="avatar-xs rounded-circle" />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h5 className="fs-13">Donald Palmer <small className="text-muted ms-2">24 Dec 2021 - 05:20PM</small></h5>
                                                            <p className="text-muted">If you have further questions, please contact Customer Support from the “Action Menu” on your <Link to="#" className="text-decoration-underline">Online Order Support</Link>.</p>
                                                        </div>
                                                    </div>
                                                    
                                                </SimpleBar>
                                                <form className="mt-4">
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label htmlFor="inputName" className="form-label text-body">Name</label>
                                                            <input className="form-control bg-light border-light" id="inputName" placeholder="Enter your name" required />
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-body">Leave a Comments</label>
                                                            <textarea className="form-control bg-light border-light" id="exampleFormControlTextarea1" rows={3} placeholder="Enter your comment..." required></textarea>
                                                        </div>
                                                        <div className="col-12 text-end">
                                                            <Link to="#" className="btn btn-success">Post Comments</Link>
                                                        </div>
                                                    </div>
                                                </form>
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