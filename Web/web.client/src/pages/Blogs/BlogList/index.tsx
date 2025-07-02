import React from 'react'
import { Container, Row } from 'reactstrap'
import Sidepanel from './Sidepanel'
import MainList from './MainList'

const BlogListView = () => {

    document.title="List View | Blog";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>

                        <Sidepanel />

                        <MainList />

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default BlogListView