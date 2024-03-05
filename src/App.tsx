import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Cells from "./Cells/Cells";
import Attendance from "./Attendance/Attendance";
import Disciples from "./Disciples/Disciples";
import Profile from "./Profile/Profile";
import Register from "./auth/Signup";
import Dashboard from "./Dashboard/Dashboard";
import SideBar from "./Custom/Sidebar/Sidebar";
import AuthService from "./services/auth.service";
// import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  const [userId, setUserId] = useState<string>("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       const currentUser = AuthService.getCurrentUser();
  //       if (currentUser) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //     }
  //   };

  //   checkAuthentication();
  // }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser && currentUser.userId) {
          setUserId(currentUser.userId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* <PrivateRoute path="/Dashboard" isAuthenticated={isAuthenticated}>
          <Dashboard />
        </PrivateRoute> */}
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Cells" element={<Cells userId={userId} />} />
        <Route path="/Disciples" element={<Disciples />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SideBar" element={<SideBar />} />
      </Routes>
    </Router>
  );
};

export default App;
