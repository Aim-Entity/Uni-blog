import React from "react";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./allRoutes";

const Index = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                // Add Non Auth Layer Later
                                // <NonAuthLayout>
                                <div>
                                    {route.component}
                                </div>
                                // </NonAuthLayout>
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
                                // Add Auth Layer Later
                                // <AuthProtected>
                                    // <VerticalLayout>{route.component}</VerticalLayout>\
                                    <div>
                                        {route.component}
                                    </div>
                                // </AuthProtected>}
                            }
                            key={idx}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;