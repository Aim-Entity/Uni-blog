import React from 'react'
import { Container, Row } from 'reactstrap'
import Sidepanel from './Sidepanel'
import MainList from './MainList'
import HorizontalLayout from '../../../Layouts/HorizontalLayout'

const BlogListView = () => {

    document.title="List View | Blog";

    return (
        <React.Fragment>
                <Container fluid>
                    <HorizontalLayout />
                    <Row>

                        <Sidepanel />

                        <MainList />

                    </Row>
                </Container>
        </React.Fragment>
    )
}

export default BlogListView