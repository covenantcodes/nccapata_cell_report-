import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import SideBar from "../Custom/Sidebar/Sidebar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExploreIcon from "@mui/icons-material/Explore";

const Dashboard = () => {
  const API_URL = "http://localhost:8080/api/";

  const [cellCount, setCellCount] = useState(null);

  useEffect(() => {
    const fetchCellCount = async () => {
      try {
        // Retrieve access token from wherever it's stored (e.g., local storage)
        const accessToken = localStorage.getItem("accessToken");
        
        // Make request to server with access token in headers
        const response = await axios.get(API_URL + "cells/count", {
          headers: {
            "x-access-token": accessToken
          }
        });
        
        setCellCount(response.data.count);
      } catch (error) {
        console.error("Error fetching cell count:", error);
      }
    };
  
    fetchCellCount();
  }, []);
  

  return (
    <div className="dashboard-main-container">
      <SideBar />

      <div className="dashboard-container">
        <div className="page-title">Dashboard</div>

        {/* <div className="page-subtitle">Overview</div> */}
        <div className="total-summary-container">
          <div className="total-summary-box">
            <div className="icon-box">
              <ExploreIcon fontSize="medium" style={{ color: "#403c9a" }} />
            </div>

            <div className="total-summary-title">Total Disciples in Cells</div>

            <div className="total-summary-number">{cellCount}</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#403c9a" }} />
            </div>

            <div className="total-summary-title">
              Total Disciples in Consolidation
            </div>

            <div className="total-summary-number">15</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#403c9a" }} />
            </div>

            <div className="total-summary-title">
              Total Disciples in School of Leaders
            </div>

            <div className="total-summary-number">7</div>
          </div>
          <div className="total-summary-box">
            <div className="icon-box">
              <PeopleAltIcon fontSize="medium" style={{ color: "#000" }} />
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
