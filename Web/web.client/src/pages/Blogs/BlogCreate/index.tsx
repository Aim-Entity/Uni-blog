import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar from "../../../assets/images/users/user-dummy-img.jpg";

const BlogCreateView = () => {
    const SingleOptions = [
        { value: 'Watches', label: 'Watches' },
        { value: 'Headset', label: 'Headset' },
        { value: 'Sweatshirt', label: 'Sweatshirt' },
        { value: '20% off', label: '20% off' },
        { value: '4 star', label: '4 star' },
      ];

    const [selectedMulti, setselectedMulti] = useState<any>(null);

    const handleMulti = (selectedMulti:any) => {
    setselectedMulti(selectedMulti);
    }  
    
    //Dropzone file upload
    const [selectedFiles, setselectedFiles] = useState<any>([]);
  
    const handleAcceptedFiles = (files:any) => {
      files.map((file:any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      setselectedFiles(files);
    }

        /**
     * Formats the size
     */
    const formatBytes = (bytes:any, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

document.title="Create Blog";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-title-input">Blog Title</Label>
                                        <Input type="text" className="form-control" id="project-title-input"
                                            placeholder="Enter project title" />
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</Label>
                                        <Input className="form-control" id="project-thumbnail-img" type="file" accept="image/png, image/gif, image/jpeg" />
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label">Blog Description</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                
                                            }}
                                            // onChange={(editor) => {
                                            //     editor.getData();
                                            // }}
                                            />
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader >
                                    <h5 className="card-title mb-0">Attached files</h5>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <p className="text-muted">Add Attached files here.</p>

                                        <Dropzone
                                            onDrop={acceptedFiles => {
                                            handleAcceptedFiles(acceptedFiles);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                            <div className="dropzone dz-clickable">
                                                <div
                                                className="dz-message needsclick"
                                                {...getRootProps()}
                                                >
                                                <div className="mb-3">
                                                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                                </div>
                                                <h4>Drop files here or click to upload.</h4>
                                                </div>
                                            </div>
                                            )}
                                        </Dropzone>

                                        <ul className="list-unstyled mb-0" id="dropzone-preview">
                                        
                                        {selectedFiles.map((f:any, i:any) => {
                                            return (
                                                <Card
                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                key={i + "-file"}
                                                >
                                                <div className="p-2">
                                                    <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                        data-dz-thumbnail=""
                                                        height="80"
                                                        className="avatar-sm rounded bg-light"
                                                        alt={f.name}
                                                        src={f.preview}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                        to="#"
                                                        className="text-muted font-weight-bold"
                                                        >
                                                        {f.name}
                                                        </Link>
                                                        <p className="mb-0">
                                                        <strong>{f.formattedSize}</strong>
                                                        </p>
                                                    </Col>
                                                    </Row>
                                                </div>
                                                </Card>
                                            );
                                            })}
                                        </ul>

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
                                            id="choices-privacy-status-input">
                                            <option defaultValue="Private">Private</option>
                                            <option value="Team">Team</option>
                                            <option value="Public">Public</option>
                                        </select>
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
                </Container>
            </div>
        </React.Fragment>
    );
};

export default BlogCreateView;