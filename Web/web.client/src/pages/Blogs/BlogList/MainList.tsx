import Pagination from '../../../Components/Common/Pagination'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Row } from 'reactstrap'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { allBlogs } from '../../../slices/thunks'
import { GetUserId } from '../../../utils/UserCookies'

const MainList = () => {
    const dispatch = useDispatch<any>();

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

    enum StatusEnum {
        Public = tr,
        Private
    }

    const [blogs, setBlogs] = useState<blogType[]>([]);

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


    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const perPageData = 6;
    const indexOfLast = currentPage * perPageData;


    return (
        <React.Fragment>
            <div className="col-xxl-9">
                <div className="row g-4 mb-3">
                    <div className="col-sm-auto">
                        <div>
                            <Link to="/blog-create" className="btn btn-success"><i className="ri-add-line align-bottom me-1"></i> Add New</Link>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="d-flex justify-content-sm-end gap-2">
                            <div className="search-box ms-2">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <i className="ri-search-line search-icon"></i>
                            </div>

                            <select className="form-control w-md" defaultValue="Yesterday" style={{width: "152px"}}>
                                <option value="All">All</option>
                                <option value="Today">Today</option>
                                <option value="Yesterday">Yesterday</option>
                                <option value="Last 7 Days">Last 7 Days</option>
                                <option value="Last 30 Days">Last 30 Days</option>
                                <option value="This Month">This Month</option>
                                <option value="Last Year">Last Year</option>
                            </select>

                        </div>
                    </div>
                </div>

                <Row className='gx-4'>
                    {blogs.map((item, idx) => (
                        
                        <Col xxl={12} key={idx}>
                            {item.author == GetUserId() || item.status == StatusEnum.Private}
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
                                                <span className="text-muted"><i className="ri-calendar-event-line me-1"></i> {item.dateCreated}</span> | <span className='text-primary'><i className="ri-user-3-line me-1"></i> {item.authorName}</span>
                                            </div>
                                            <p className="text-muted mb-2">{item.description}</p>
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

                {/* <div className="row g-0 text-center text-sm-start align-items-center mb-4">
                    <div className="col-sm-6">
                        <div>
                            <p className="mb-sm-0 text-muted">Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">6</span> of <span className="fw-semibold text-decoration-underline">21</span> entries</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <Pagination
                            perPageData={perPageData}
                            data={dummyData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div> */}



            </div>
        </React.Fragment>
    )
}

export default MainList