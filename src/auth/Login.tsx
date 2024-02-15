import { useState, MouseEventHandler } from "react";
import AuthService from "../services/auth.service";
import "./Login.css";
import "../Custom/Input/CustomInput.css";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import loadingGif from "../../img/loader.gif";

const Login = () => {
  const [isEye, setIsEye] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };


  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setMessage(message);

    setIsLoading(true); // Show loading indicator when login button is pressed

    AuthService.login(username, password).then(
      () => {
        setIsLoading(false); // Hide loading indicator on successful login
         navigate("/Dashboard"); 
      },
      (error) => {
        setIsLoading(false); // Hide loading indicator on login error

        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };


  const handleNavigateRegister = () => {
    navigate("/Register");
  };



  return (
    <div className="main-container">
      {isLoading ? null : (
        <div className="login-container">
        <div className="logo-container">
          <img src="../../img/church.png" alt="" />
        </div>

        <div className="welcome-text">Welcome Back!</div>
        <div className="motivation">...making disciples of all nations</div>
        <p className="error-text">{message}</p>
        <div className="custom-input">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={onChangeUsername}
            value={username}
            required
          />
        </div>

        <div className="password-input-container custom-input">
          <input
            type={isEye ? "password" : "text"}
            placeholder="Password"
            id="password"
            onChange={onChangePassword}
            value={password}
            required
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
      )}

      {/* Loading Modal */}
      {isLoading && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
            <img src={loadingGif} alt="Loading...." />
        </div>
      )}
    </div>
  );
};

export default Login;
