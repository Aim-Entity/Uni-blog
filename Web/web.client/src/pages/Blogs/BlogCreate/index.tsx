import React,{useState} from 'react';
import { Card, CardBody, Col, Container, Form, Input, Label, Row } from 'reactstrap';

import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//Import Images

import { useDispatch } from 'react-redux';
import { GetUserId, GetUserName } from '../../../utils/UserCookies';
import HorizontalLayout from '../../../Layouts/HorizontalLayout';
import { createBlog } from '../../../slices/thunks';
import withRouter from '../../../Components/Common/withRouter';

const BlogCreateView = (props : any) => {
    type blogDraftType = {
        author: string,
        authorName: string,
        title: string,
        description: string,
        thumbnailDescription: string,
        thumbnailImage: string | ArrayBuffer | null,
        isPrivate: boolean,
        IsCommentsEnabled: boolean,
    }

    const dispatch : any = useDispatch();

    const [blogDraft, setBlogDraft] = useState<blogDraftType>({
        author: GetUserId(),
        authorName: GetUserName(),
        title: "",
        description: "",
        thumbnailImage: "",
        thumbnailDescription: "",
        isPrivate: true,
        IsCommentsEnabled: false,
    });

    const [selectedMulti, setselectedMulti] = useState<any>(null);

    const handleMulti = (selectedMulti:any) => {
    setselectedMulti(selectedMulti);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const data = new FileReader();
        data.addEventListener("load", () => {
            setBlogDraft({...blogDraft, thumbnailImage: data.result});
        });

        data.readAsDataURL(e.target.files[0]);
    }

document.title="Blog Create";

    return (
        <React.Fragment>
            <div className="">
                <Container fluid>
                    <HorizontalLayout />
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(createBlog(blogDraft, props.router.navigate));
                    }}>
                        <Row>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <div className="mb-3">
                                            <Label className="form-label" htmlFor="project-title-input">Blog Title</Label>
                                            <Input type="text" className="form-control" id="project-title-input"
                                                placeholder="Enter project title" 
                                                value={blogDraft.title}
                                                onChange={(e) => {
                                                    setBlogDraft({...blogDraft, title: e.target.value});
                                                }}
                                                required/>
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</Label>
                                            <Input className="form-control" id="project-thumbnail-img" 
                                            type="file" 
                                            accept="image/png, image/gif, image/jpeg" 
                                            onChange={(e) => {
                                                onFileChange(e);
                                            }}/>
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label" htmlFor="project-title-input">Thumbnail Description</Label>
                                            <Input type="text" className="form-control" id="project-thumbnail-description-input"
                                                placeholder="Enter description" 
                                                value={blogDraft.thumbnailDescription}
                                                onChange={(e) => {
                                                    setBlogDraft({...blogDraft, thumbnailDescription: e.target.value});
                                                }}
                                                required/>
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Blog Description</Label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={blogDraft.description}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    
                                                }}
                                                value={blogDraft.description}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setBlogDraft({...blogDraft, description: data})
                                                }}
                                                required
                                                />
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="text-end mb-4">
                                    <button type="submit" className="btn btn-success w-sm">Create</button>
                                </div>
                            </Col>

                            <Col lg={4}>
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Privacy</h5>
                                    </div>
                                    <CardBody>
                                        <div>
                                            <Label htmlFor="choices-privacy-status-input" className="form-label">Status</Label>
                                            <select className="form-select" data-choices data-choices-search-false
                                                id="choices-privacy-status-input"
                                                onChange={e => {
                                                    setBlogDraft({...blogDraft, isPrivate: e.target.value == "Private" ? true : false})
                                                }}
                                                required>
                                                <option defaultValue="Private">Private</option>
                                                <option value="Public">Public</option>
                                            </select>
                                        </div>
                                    </CardBody>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Comments</h5>
                                    </div>
                                    <CardBody>
                                        <Label htmlFor="choices-priority-input" className="form-label">Enable Comments</Label>
                                        <select className="form-select" data-choices data-choices-search-false
                                            id="choices-priority-input"
                                            onChange={e => {
                                                setBlogDraft({...blogDraft, IsCommentsEnabled: e.target.value == "Enable" ? true : false})
                                            }}
                                            required>
                                            <option defaultValue="Disable">Disable</option>
                                            <option value="Enable">Enable</option>
                                        </select>

                                    </CardBody>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(BlogCreateView);