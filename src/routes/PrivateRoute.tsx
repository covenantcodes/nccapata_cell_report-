// import { Route, Navigate, RouteProps } from "react-router-dom";

// type PrivateRouteProps = {
//   isAuthenticated: boolean;
//   children: React.ReactNode; // Children is a required prop
// } & RouteProps; // Intersection with RouteProps

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   isAuthenticated,
//   children,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated ? children : <Navigate to="/login" replace={true} />
//       }
//     />
//   );
// };

// export default PrivateRoute;


// import { PropsWithChildren, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// type PrivateRouteProps = PropsWithChildren;


// export default function PrivateRoute({children}: PrivateRouteProps) {
//     const user = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     return children;
// }