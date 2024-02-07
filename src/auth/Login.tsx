import { useState } from "react";
import "./Login.css";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import {isEmail} from "validator"

const Login = () => {
  // const eyeIcon = <FontAwesomeIcon className="eyeIcon" icon={faEye} />;
  // const eyeSlash = <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />;
  // const required = value => {
  //   if (!value) {
  //     return (
  //       <div className="required-text">
  //           This field is required!
  //       </div>
  //     )
  //   }
  // }

  // const email = value => {
  //   if (!isEmail(value)) {
  //     return (
  //       <div className="required-text">
  //           This is not a valid email.
  //       </div>
  //     );
  //   }
  // };

  const [isEye, setIsEye] = useState(true);

  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in...");

    navigate("/Dashboard");
  };

  const handleNavigateRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo-container">
          <img src="../../img/church.png" alt="" />
        </div>

        <div className="welcome-text">Welcome Back!</div>
        <div className="motivation">...making disciples of all nations</div>
        

        <div className="custom-input">
          <input type="text" placeholder="Username" className="" />
        </div>

        <div className="password-input-container custom-input">
         

          <input type="text" placeholder="Password" className="" />
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
          label="Login"
          bgcolor="var(--primary-color)"
          width="320px"
          fontFamily="var(--main-font)"
          fontSize="1rem"
          marginTop="1rem"
          cursor="pointer"
        />

        <div className="cta-register" onClick={handleNavigateRegister}>
          Don't have an account? <span>Register</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
