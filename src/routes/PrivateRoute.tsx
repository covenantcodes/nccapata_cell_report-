// import React from "react";
// import { Route, Navigate, RouteProps } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {
//   isAuthenticated: boolean;
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children, ...rest }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/Login" replace />;
//     }

//     return <Route {...rest}>{children}</Route>;
//   };

// export default PrivateRoute;
