import { useState } from "react";
import "./Login.css";
import "./Signup.css";
import CustomInput from "../Custom/Input/CustomInput";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const eyeIcon = <FontAwesomeIcon className="eyeIcon" icon={faEye} />;
  // const eyeSlash = <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />;
  const [isEye, setIsEye] = useState(true);

  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in...");

    navigate("/Dashboard");
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo-container">
          <img src="../../img/church.png" alt="" />
        </div>

        <div className="welcome-text">Create an Account</div>
        {/* <div className="motivation">
          Welcome to the Cell Leaders Reporting System
        </div> */}

        <CustomInput label="Email" width="300px" />

        <CustomInput label="Username" width="300px" />

        <div className="password-input-container">
          <CustomInput
            label="Password"
            width="300px"
            type={!isEye ? "text" : "password"}
          />
          <div className="eyeIcon-container" onClick={handleIconClick}>
            {isEye ? (
              <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon className="eyeIcon" icon={faEye} />
            )}
          </div>
        </div>

        <div className="forgot-password-container">forgot password?</div>

        <CustomButton
          border="none"
          color="white"
          padding="1rem"
          onClick={handleLogin}
          radius="5px"
          label="Register"
          bgcolor="var(--primary-color)"
          width="320px"
          fontFamily="var(--main-font)"
          fontSize="1rem"
          marginTop="1rem"
          cursor="pointer"
        />

        <div className="cta-register">
          Don't have an account? <span>Register</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
