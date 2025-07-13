import React, {useState} from 'react';
import { Card, CardBody, Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";

//Import Images
import { useFormik } from 'formik';
import withRouter from '../../../Components/Common/withRouter';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../../slices/thunks';
import { GetUserId } from '../../../utils/UserCookies';


const BlogCreateView = (props : any) => {
    type blogDraftType = {
        title: string,
        description: string,
        thumbnailImage: string | ArrayBuffer | null,
        private: boolean,
    }

    const dispatch : any = useDispatch();

    const [blogDraft, setBlogDraft] = useState<blogDraftType>({
        title: "",
        description: "",
        thumbnailImage: "",
        private: true,
    });

    const validation : any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            author: GetUserId(),
            title: blogDraft.title || '',
            description: blogDraft.description || '',
            thumbnailImage: blogDraft.thumbnailImage || '',
            private: blogDraft.private || 'Private',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Blog Title"),
            private: Yup.string().required("Please Enter Blog Privacy"),
        }),
        onSubmit: (values) => {
            values.description = blogDraft.description;
            console.log(values);
            dispatch(createBlog(values, props.router.navigate));
        }
    });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const data = new FileReader();
        data.addEventListener("load", () => {
            setBlogDraft({...blogDraft, thumbnailImage: data.result});
            validation.values.thumbnailImage = blogDraft.thumbnailImage;
        });

        data.readAsDataURL(e.target.files[0]);
    }

    document.title="Create Blog";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit(e);
                        console.log(validation)
                        return false;
                    }}
                    action="#">
                        <Row>
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <div className="mb-3">
                                            <Label className="form-label" htmlFor="title">Blog Title</Label>
                                            <Input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Enter project title" 
                                                name="title"
                                                onChange={(e) => {
                                                    setBlogDraft({...blogDraft, title: validation.values.title});
                                                    validation.handleChange(e);
                                                }}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.title || ""}
                                                invalid={
                                                    validation.touched.title && validation.errors.title ? true : false
                                                }
                                            />

                                            {validation.touched.title && validation.errors.title ? (
                                                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label" htmlFor="thumbnailImage">Thumbnail Image</Label>
                                            <Input 
                                                className="form-control" 
                                                name="thumbnailImage" 
                                                type="file" 
                                                accept="image/png, image/gif, image/jpeg" 
                                                onChange={(e) => {
                                                    onFileChange(e);
                                                    validation.handleChange(e);
                                                }}
                                                onBlur={validation.handleBlur}
                                                invalid={
                                                    validation.touched.thumbnailImage && validation.errors.thumbnailImage ? true : false
                                                }
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <Label className="form-label">Blog Description</Label>
                                            <CKEditor
                                                editor={ClassicEditor} 
                                                data={blogDraft.description}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setBlogDraft({...blogDraft, description: data})
                                                    validation.handleChange("description", event);
                                                }}
                                                value={validation.values.description || ""}
                                                onBlur={validation.handleBlur("description")}
                                                invalid={
                                                    validation.touched.description && validation.errors.description ? true : false
                                                }
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
                                            <select 
                                            className="form-select" 
                                            data-choices 
                                            data-choices-search-false
                                            name="private"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.private || "Private"}
                                                id="choices-privacy-status-input">
                                                <option defaultValue="Private">Private</option>
                                                <option value="Public">Public</option>
                                            </select>

                                            {validation.touched.private && validation.errors.private ? (
                                                <FormFeedback type="invalid">{validation.errors.private}</FormFeedback>
                                            ) : null}
                                        </div>
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