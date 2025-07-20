import Pagination from '../../../Components/Common/Pagination'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { allBlogs } from '../../../slices/thunks'
import { GetUserId } from '../../../utils/UserCookies'
import Loader from '../../../Components/Common/Loader'

const MainList = () => {
    const dispatch = useDispatch<any>();

    type blogType = {
        id: number,
        title: string,
        description: string,
        thumbnailImage: string | ArrayBuffer | null,
        thumbnailDescription: string,
        isPrivate: boolean,
        author: string,
        authorName: string,
        dateCreated: string,
    }

    const [blogs, setBlogs] = useState<blogType[]>([]);
    const [blogsLoading, setBlogsLoading] = useState<boolean>(true);

    const selectBlogs = createSelector(
        (slice) => slice.Blog,
        (state) => state.blogs
    );

    const selectBlogsLoading = createSelector(
        (slice) => slice.Blog,
        (state) => state.blogsLoading
    );

    const blogsData = useSelector(selectBlogs);
    const blogsLoadingData = useSelector(selectBlogsLoading);

    useEffect(() => {
        dispatch(allBlogs());
    }, [dispatch]);

    useEffect(() => {
        setBlogsLoading(blogsLoadingData);
    }, [blogsLoadingData]);

    useEffect(() => {
        setBlogs(blogsData);
    }, [blogsData]);

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
            <div className="col-xxl-12">
                <div className="row g-4 mb-3">
                    <div className="w-100">
                        <div>
                            <Link to="/blog-create" className="btn btn-success w-100"><i className="ri-add-line align-bottom me-1 w-full"></i> Add New</Link>
                        </div>
                    </div>
                </div>

                <Row className='gx-4'>
                    {blogs.filter((blog) => blog.isPrivate  == false || blog.author == GetUserId()).map((item, idx) => (
                        
                        <Col xxl={12} key={idx}>
                            <Card>
                                <CardBody>
                                    <div className="row g-4">
                                        <div className="col-xxl-3 col-lg-5">
                                            {item.thumbnailImage && (
                                                <img src={item.thumbnailImage} alt="" className="img-fluid rounded w-100 object-fit-cover" />
                                            )}

                                            {!item.thumbnailImage && (
                                                <div className="img-fluid rounded w-100 h-100 object-fit-cover bg-dark d-flex justify-content-center align-items-center"><h3 className="text-white">No Thumbnail</h3></div>
                                            )}
                                        </div>
                                        <div className="col-xxl-9 col-lg-7">
                                            {/* <p className="mb-2 text-primary text-uppercase">{item.category}</p> */}
                                            <Link to={`/blog-overview/${item.id}`}>
                                                <h5 className="fs-15 fw-semibold">{item.title}</h5>
                                            </Link>
                                            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                                <span className="text-muted"><i className="ri-calendar-event-line me-1"></i> {new Date(item.dateCreated).toLocaleTimeString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</span> | <span className="text-muted"><i className="ri-eye-line me-1"></i> {item.isPrivate == true ? "Private" : "Public"}</span> | <span className='text-primary'><i className="ri-user-3-line me-1"></i> {item.authorName}</span>
                                            </div>
                                            <p className="text-muted mb-2">{item.thumbnailDescription}</p>
                                            <Link to={`/blog-overview/${item.id}`} className="text-decoration-underline">Read more <i className="ri-arrow-right-line"></i></Link>
                                            {/* <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
                                                {item.tags.map((item, idx) => (
                                                    <Link to="#!" key={idx} className="badge text-success bg-success-subtle">{item}</Link>
                                                ))}
                                            </div> */}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </React.Fragment>
    )
}

export default MainList