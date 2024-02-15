import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";

// PAGES IMPORT
import Cells from "./Cells/Cells";
import Attendance from "./Attendance/Attendance";
import Disciples from "./Disciples/Disciples";
import Profile from "./Profile/Profile";
import Register from "./auth/Signup";
import Dashboard from "./Dashboard/Dashboard";
import SideBar from "./Custom/Sidebar/Sidebar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Cells" element={<Cells />} />
        <Route path="/Disciples" element={<Disciples />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SideBar" element={<SideBar />} />
      </Routes>
    </Router>
  );
};

export default App;
