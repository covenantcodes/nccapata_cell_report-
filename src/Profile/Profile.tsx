import SideBar from "../Custom/Sidebar/Sidebar";
import "./Profile.css";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="profile-main-container">
      <SideBar />

      <div className="profile-body-container">
        <div className="profile-container">
          <div className="page-title">My Profile</div>
          <div className="profile-image-container">
            <img
              src="../../../img/profile.jpg"
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-details-container">
            <div className="profile-details">
              <div className="profile-name">{currentUser?.username}</div>
            </div>
            <div className="profile-details">
              <div className="profile-email">{currentUser?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
