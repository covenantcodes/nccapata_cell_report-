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
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        className="sidebar-main"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "rgba(11, 41, 72, 0.961)",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#fff",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}
        >
          <div className="sidelogo-container">
            <img
              src="../../../img/church.png"
              alt="Church Logo"
              className="logo"
            />
            <div className="sidebar-title">NCCAMC CRS</div>
          </div>
          <MenuItem
            component={<Link to="/Dashboard" className="link" />}
            icon={<GridViewRoundedIcon />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="/Cells" className="link" />}
            icon={<ReceiptRoundedIcon />}
          >
            {" "}
            My Cells{" "}
          </MenuItem>
          <MenuItem
            component={<Link to="disciples" className="link" />}
            icon={<MonetizationOnRoundedIcon />}
          >
            My Disciples
          </MenuItem>
          <MenuItem
            component={<Link to="attendance" className="link" />}
            icon={<MonetizationOnRoundedIcon />}
          >
            Attendance
          </MenuItem>
          <MenuItem
            component={<Link to="Profile" className="link" />}
            icon={<MonetizationOnRoundedIcon />}
          >
            Profile
          </MenuItem>
          <MenuItem
            component={<Link to="dashboard" className="link" />}
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
