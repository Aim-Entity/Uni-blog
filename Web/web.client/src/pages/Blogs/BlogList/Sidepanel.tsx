import React from 'react'
import { Link } from 'react-router-dom'

import { Card, CardBody, Col } from 'reactstrap'

const Sidepanel = () => {
    return (
        <React.Fragment>
            <Col xxl={3}>
                <Card>
                    <CardBody className="p-4">
                        <div className="search-box">
                            <p className="text-muted">Search</p>
                            <div className="position-relative">
                                <input type="text" className="form-control rounded bg-light border-light" placeholder="Search..." />
                                <i className="mdi mdi-magnify search-icon"></i>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-top border-dashed border-bottom-0 border-start-0 border-end-0">
                            <p className="text-muted">Categories</p>

                            <ul className="list-unstyled fw-medium">
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Art & Design</Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Inspiration & Innovation <span className="badge badge-soft-success rounded-pill float-end ms-1 font-size-12">04</span></Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Business</Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Project</Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Lifestyle</Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Design Resources & Tools</Link></li>
                                <li><Link to="#" className="text-muted py-2 d-block"><i className="mdi mdi-chevron-right me-1"></i> Travel<span className="badge badge-soft-success rounded-pill ms-1 float-end font-size-12">12</span></Link></li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

export default Sidepanel