import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button, Spinner } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import { registerUser, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import ParticlesAuth from "./ParticlesAuth";
import { createSelector } from "reselect";

const Register = () => {
    const dispatch:any = useDispatch();
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    
    const [loader, setLoader] = useState<boolean>(false);

    const history = useNavigate();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,                                                                                                                       

        initialValues: {
            FirstName: '',
            LastName: '',
            Email: '',
            Password: '',
            ConfirmPassword: ''
        },
        validationSchema: Yup.object({                                                                                                                                                                                                                                                                                                                                                                               
            Email: Yup.string().required("Please Enter Your Email"),
            FirstName: Yup.string().required("Please Enter Your First Name"),
            LastName: Yup.string().required("Please Enter Your Last Name"),
            Password: Yup.string().required("Please Enter Your Password"),
            ConfirmPassword: Yup.string()
            .oneOf([Yup.ref('Password'), "Passwords Do Not Match"],)
            .required('Confirm Password is required')
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
            setLoader(true)
        }
    });

    const selectLayoutState = (state: any) => state.Account;
    const registerdatatype = createSelector(
        selectLayoutState,
        (account) => ({
            success: account.success,
            error: account.error
        })
    );
    // Inside your component
    const {
        error, success
    } = useSelector(registerdatatype);

    useEffect(() => {
        if (success) {
            setTimeout(() => history("/login"), 3000);
        }

        if(error) {
            setLoader(false);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 6000);

    }, [dispatch, success, error, history]);

    document.title = "Sign Up | Blog";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            {/* <img src={logoLight} alt="" height="80" /> */}
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Register</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Create New Account</h5>
                                            <p className="text-muted">Get your free blog account now</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                autoComplete="off"
                                                className="needs-validation" method="post">

                                                {success && success ? (
                                                    <>
                                                        {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
                                                        <ToastContainer autoClose={2000} limit={1} />
                                                        <Alert color="success">
                                                            Register User Successfully and Your Redirect To Login Page...
                                                        </Alert>
                                                    </>
                                                ) : null}

                                                {error && error ? (
                                                    <Alert color="danger"><div>
                                                        Email has been Register Before, Please Use Another Email Address... </div></Alert>
                                                ) : null}

                                                <div className="mb-3">
                                                    <Label htmlFor="Email" className="form-label">Email <span className="text-danger">*</span></Label>
                                                    <Input
                                                        id="Email"
                                                        name="Email"
                                                        className="form-control"
                                                        placeholder="Enter email address"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.Email || ""}
                                                        invalid={
                                                            validation.touched.Email && validation.errors.Email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.Email && validation.errors.Email ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.Email}</div></FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="FirstName" className="form-label">Forename <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="FirstName"
                                                        type="text"
                                                        placeholder="Enter forename"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.FirstName || ""}
                                                        invalid={
                                                            validation.touched.FirstName && validation.errors.FirstName ? true : false
                                                        }
                                                    />
                                                    {validation.touched.FirstName && validation.errors.FirstName ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.FirstName}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="LastName" className="form-label">Surname <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="LastName"
                                                        type="text"
                                                        placeholder="Enter surname"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.LastName || ""}
                                                        invalid={
                                                            validation.touched.LastName && validation.errors.LastName ? true : false
                                                        }
                                                    />
                                                    {validation.touched.LastName && validation.errors.LastName ? (
                                                        <FormFeedback type="invalid"><div>{validation.errors.LastName}</div></FormFeedback>
                                                    ) : null}

                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="Password" className="form-label">Password <span className="text-danger">*</span></Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                        name="Password"
                                                        type={passwordShow ? "text" : "password"}
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.Password || ""}
                                                        invalid={
                                                            validation.touched.Password && validation.errors.Password ? true : false
                                                        }
                                                        />
                                                        {validation.touched.Password && validation.errors.Password ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.Password}</div></FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="mb-2">
                                                    <Label htmlFor="ConfirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="ConfirmPassword"
                                                            type={passwordShow ? "text" : "password"}
                                                            placeholder="Confirm Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.ConfirmPassword || ""}
                                                            invalid={
                                                                validation.touched.ConfirmPassword && validation.errors.ConfirmPassword ? true : false
                                                            }
                                                        />
                                                        {validation.touched.ConfirmPassword && validation.errors.ConfirmPassword ? (
                                                            <FormFeedback type="invalid"><div>{validation.errors.ConfirmPassword}</div></FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                <Button color="success" className="w-100" type="submit" disabled={loader}>
                                                        {loader && <Spinner size="sm" className='me-2'> Loading... </Spinner>}
                                                        Sign Up
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Register;

    const selectLayoutState = (state: any) => state.Account;