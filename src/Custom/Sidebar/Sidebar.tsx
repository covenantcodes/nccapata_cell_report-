import {
  Sidebar,
  Menu,
  MenuItem,
  // SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import "./Sidebar.css";
import { CSSObject } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { Link } from "react-router-dom";

// import Cells from "../../Cells/Cells";
// import Attendance from "../../Attendance/Attendance";
// import Disciples from "../../Disciples/Disciples";
// import Profile from "../../Profile/Profile";
// import Dashboard from "../../Dashboard/Dashboard";

interface MenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

type ElementStyles =
  | CSSObject
  | ((params: MenuItemStyles) => CSSObject | undefined);

const SideBar = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "17%",
      }}
    >
      <Sidebar
        className="sidebar-main"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "rgba(11, 41, 72, 0.961)",
          },
        }}
      >
        <Menu>
          <div className="sidelogo-container">
            <img
              src="../../../img/church.png"
              alt="Church Logo"
              className="logo"
            />
            <div className="sidebar-title">NCCAMC CRS</div>
          </div>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Dashboard" className="sidebar-menuitem" />}
            icon={<GridViewRoundedIcon />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Cells" className="sidebar-menuitem" />}
            icon={<ReceiptRoundedIcon />}
          >
            {" "}
            My Cells{" "}
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Disciples" className="sidebar-menuitem" />}
            icon={<MonetizationOnRoundedIcon />}
          >
            My Disciples
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Attendance" className="sidebar-menuitem" />}
            icon={<ReceiptRoundedIcon />}
          >
            Attendance
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Profile" className="sidebar-menuitem" />}
            icon={<MonetizationOnRoundedIcon />}
          >
            Profile
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="dashboard" className="sidebar-menuitem" />}
            icon={<LogoutRoundedIcon />}
          >
            {" "}
            Logout{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
