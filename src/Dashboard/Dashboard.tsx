import "./Dashboard.css";
import SideBar from "../Custom/Sidebar/Sidebar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExploreIcon from "@mui/icons-material/Explore";

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <SideBar />

      <div className="dashboard-container">
        <div className="page-title">Dashboard</div>

        <div className="total-summary-container">
          <div className="total-summary-box">
            <div className="icon-box">
              <ExploreIcon fontSize="medium" />
            </div>

            <div className="total-summary-title">Total Disciples in Cells</div>

            <div className="total-summary-number">2</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#ff6347" }} />
            </div>

            <div className="total-summary-title">
              Total Disciples in Consolidation
            </div>

            <div className="total-summary-number">15</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#32cd32" }} />
            </div>

            <div className="total-summary-title">
              Total Disciples in School of Leaders
            </div>

            <div className="total-summary-number">7</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#ff7b00" }} />
            </div>

            <div className="total-summary-title">
              Total Number of New Disciples
            </div>

            <div className="total-summary-number">3</div>
          </div>
        </div>

        <div className="charts-container">
          Other summaries are coming in an update...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
