import { useState } from "react";
import "./Login.css";
import CustomInput from "../Custom/Input/CustomInput";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  // const eyeIcon = <FontAwesomeIcon className="eyeIcon" icon={faEye} />;
  // const eyeSlash = <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />;
  const [isEye, setIsEye] = useState(true);

  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo-container">
          <img src="../../img/church.png" alt="" />
        </div>

        <div className="welcome-text">Welcome Back!</div>
        <div className="motivation">...making disciples of all nations</div>

        <CustomInput label="Username" width="300px" />

        <div className="password-input-container">
          <CustomInput label="Password" width="300px" type="password"/>
          <div className="eyeIcon-container" onClick={handleIconClick}>
            {isEye ? (
                <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />
                ) : (
                <FontAwesomeIcon className="eyeIcon" icon={faEye} />
            )}
          </div>
        </div>

        <div className="forgot-password-container">
            forgot password?
        </div>
        <CustomButton
          border="none"
          color="white"
          padding="1rem"
          onClick={() => console.log("Clicked!")}
          radius="5px"
          children="Submit"
          bgcolor="var(--primary-color)"
          width="320px"
          fontFamily="var(--main-font)"
          fontSize="1rem"
          marginTop="1rem"
        />
      </div>
    </div>
  );
};

export default Login;
