import "./Dashboard.css";
import SideBar from "../Custom/Sidebar/Sidebar";


const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <SideBar />
      <div>This is the Dashboard</div>
    </div>
  );
};

export default Dashboard;
