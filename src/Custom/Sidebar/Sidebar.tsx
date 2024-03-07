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
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

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
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   // Check if access token exists
  //   if (!accessToken) {
  //     console.error("Access token not found");
  //     return;
  //   }

  //   // Include the access token in the request headers
  //   const config = {
  //     headers: {
  //       Authorization: "x-access-token",
  //     },
  //   };

  //   axios
  //     .post(API_URL + "signout", {}, config)
  //     .then(() => {
  //       // Clear local storage or session storage
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("user");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.error("Error logging out:", error);
  //     });
  // };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "17%",
        overflowX: "hidden",
        backgroundColor: "rgba(11, 41, 72, 0.961)",
        zIndex: 1000,
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
            icon={<ExploreIcon />}
          >
            {" "}
            My Cells{" "}
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Disciples" className="sidebar-menuitem" />}
            icon={<PeopleAltIcon />}
          >
            My Disciples
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Attendance" className="sidebar-menuitem" />}
            icon={<FactCheckIcon />}
          >
            Attendance
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            component={<Link to="/Profile" className="sidebar-menuitem" />}
            icon={<PersonIcon />}
          >
            Profile
          </MenuItem>
          <MenuItem
            className="sidebar-menuitem"
            icon={<LogoutRoundedIcon />}
            onClick={handleLogout}
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
