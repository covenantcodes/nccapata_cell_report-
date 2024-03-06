import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Cells from "./Cells/Cells";
import Attendance from "./Attendance/Attendance";
import Disciples from "./Disciples/Disciples";
import Profile from "./Profile/Profile";
import Register from "./auth/Signup";
import Dashboard from "./Dashboard/Dashboard";
import CellsDetailed from "./Cells/CellsDetailed";
import SideBar from "./Custom/Sidebar/Sidebar";
import AuthService from "./services/auth.service";

const App = () => {
  const [userId, setUserId] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        setIsAuthenticated(!!currentUser);
        if (currentUser && currentUser.userId) {
          setUserId(currentUser.userId);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after authentication check
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
    
  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Cells"
          element={
            isAuthenticated ? (
              <Cells userId={userId} />
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Disciples"
          element={isAuthenticated ? <Disciples /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Attendance"
          element={isAuthenticated ? <Attendance /> : <Navigate to="/Login" />}
        />
        <Route
          path="/Profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/Login" />}
        />
        <Route
          path="/SideBar"
          element={isAuthenticated ? <SideBar /> : <Navigate to="/Login" />}
        />

        <Route
          path="/CellsDetailed"
          element={isAuthenticated ? <CellsDetailed/> : <Navigate to="/Login"/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
