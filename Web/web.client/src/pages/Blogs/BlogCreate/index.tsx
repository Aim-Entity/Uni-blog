import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";

import Dropzone from "react-dropzone";

//Import Images
import { useFormik } from 'formik';
import withRouter from '../../../Components/Common/withRouter';


const BlogCreateView = () => {
    const SingleOptions = [
        { value: 'Watches', label: 'Watches' },
        { value: 'Headset', label: 'Headset' },
        { value: 'Sweatshirt', label: 'Sweatshirt' },
        { value: '20% off', label: '20% off' },
        { value: '4 star', label: '4 star' },
    ];

    type blogDraftType = {
        title: string,
        description: string,
        private: boolean,
        tags: string[],
    }

    const [blogDraft, setBlogDraft] = useState<blogDraftType>({
        title: "",
        description: "",
        private: true,
        tags: [""],
    });

    const [selectedMulti, setselectedMulti] = useState<any>(null);

    const [fileBase64, setFileBase64] = useState();
      

    const handleMulti = (selectedMulti:any) => {
        setselectedMulti(selectedMulti);
    }  

    const validation : any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title: blogDraft.title || '',
            private: blogDraft.private || 'Private',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Blog Title"),
            private: Yup.string().required("Please Enter Blog Privacy"),
        }),
        onSubmit: (values) => {
            setBlogDraft({...blogDraft, title: validation.values.title, private: validation.values.private == "Private" ? true : false});
            console.log(blogDraft);
        }
    });

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const data = new FileReader();
        data.addEventListener("load", () => {
            setFileBase64(data.result);
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
                        validation.handleSubmit();
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
                                                name="title"
                                                placeholder="Enter project title" 
                                                onChange={validation.handleChange}
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
                                            <Label className="form-label" htmlFor="thumbnail">Thumbnail Image</Label>
                                            <Input 
                                                className="form-control" 
                                                name="thumbnail" 
                                                type="file" 
                                                accept="image/png, image/gif, image/jpeg" 
                                                onChange={onFileChange}
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
                                                }}
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

                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">Tags</h5>
                                    </div>
                                    <CardBody>
                                        <div className="mb-3">
                                            <Label htmlFor="choices-categories-input" className="form-label">Categories</Label>
                                            <select className="form-select" data-choices data-choices-search-false
                                                id="choices-categories-input">
                                                <option defaultValue="Designing">Designing</option>
                                                <option value="Development">Development</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label htmlFor="choices-text-input" className="form-label">MultiSelect Test</Label>
                                            <Select
                                                value={selectedMulti}
                                                isMulti={true}                                                            
                                                onChange={(selectedMulti:any) => {
                                                    handleMulti(selectedMulti);
                                                }}
                                                options={SingleOptions}
                                            />
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