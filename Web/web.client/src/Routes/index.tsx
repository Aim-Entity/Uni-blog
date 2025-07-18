import React from "react";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./allRoutes";
import HorizontalLayout from "../Layouts/HorizontalLayout";
import AuthProtected from "./AuthProtected";

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <div>
                                    {route.component}
                                </div>
                            }
                            key={idx}
                        />
                    ))}
                </Route>

                <Route>
                    {protectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected>
                                    <div>{route.component}</div>
                                </AuthProtected>}
                            key={idx}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;