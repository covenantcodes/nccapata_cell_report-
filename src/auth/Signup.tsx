import { useState, ChangeEvent, MouseEventHandler, useEffect } from "react";
import "./Login.css";
import "./Signup.css";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import AuthService from "../services/auth.service";

const Signup = () => {
  const navigate = useNavigate();
  const [isEye, setIsEye] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(""); // Clear email error
    setErrorMessage(""); // Clear error message
    setHasError(false); // Clear hasError flag
    setSuccessful(false); // Clear successful flag
    // Validate email input
    if (value && !validator.isEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage(""); // Clear error message
    setHasError(false); // Clear hasError flag
    setSuccessful(false); // Clear successful flag
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(""); // Clear error message
    setHasError(false); // Clear hasError flag
    setSuccessful(false); // Clear successful flag
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setErrorMessage(""); // Clear error message
    setHasError(false); // Clear hasError flag
    setSuccessful(false); // Clear successful flag
  };

  const validatePasswordStrength = (password: string) => {
    // Trim the password to remove leading and trailing whitespace
    password = password.trim();

    // Check if the password meets the minimum length requirement
    if (password.length < 8) {
      return false;
    }

    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    for (const char of password) {
      if (char >= "A" && char <= "Z") {
        hasUppercase = true;
      } else if (char >= "a" && char <= "z") {
        hasLowercase = true;
      } else if (char >= "0" && char <= "9") {
        hasNumber = true;
      } else {
        hasSpecialCharacter = true;
      }
    }

    // Check if the password contains at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter)) {
      return false;
    }

    return true;
  };

  const handleRegister: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // Validate password strength and match
    if (!validatePasswordStrength(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setHasError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setHasError(true);
      return;
    }

    // Clear any previous error messages if password meets criteria
    setErrorMessage("");
    setHasError(false);

    // Check for duplicate username or email
    AuthService.register(username, email, password).then(
      (response) => {
        // Check if the response data structure includes a 'message' property
        if (response.data && response.data.message) {
          setMessage(response.data.message);
          setSuccessful(true);
        } else {
          // Handle the case when the response data structure does not include a 'message' property
          // You can set a default success message or handle it differently based on your requirements
          setSuccessful(true);
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  useEffect(() => {
    if (successful) {
      // Redirect to dashboard after successful registration
      navigate("/Dashboard");
    }
  }, [successful, navigate]);

  
  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };


  const handleNavigateLogin = () => {
    navigate("/Login");
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

        <div
          className={`error-text ${
            message.includes("successfully") ? "success" : ""
          }`}
        >
          {message}
        </div>

        <div className="custom-input">
          <input
            type="text"
            placeholder="Email"
            autoComplete="off"
            onChange={handleEmailChange}
            value={email}
            required
          />
          {emailError && <div className="error-text">{emailError}</div>}
        </div>
        <div className="custom-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="password-input-container custom-input">
          <input
            type={isEye ? "password" : "text"}
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="eyeIcon-container" onClick={handleIconClick}>
            {isEye ? (
              <FontAwesomeIcon className="eyeSlash" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon className="eyeIcon" icon={faEye} />
            )}
          </div>
        </div>
        <div className="password-input-container custom-input">
          <input
            type={isEye ? "password" : "text"}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
          onClick={handleRegister}
          radius="5px"
          label="Register"
          bgcolor="var(--primary-color)"
          width="320px"
          fontFamily="var(--main-font)"
          fontSize="1rem"
          marginTop="1rem"
          cursor="pointer"
          disabled={hasError}
        />
        {errorMessage && <div className="error-text">{errorMessage}</div>}

        <div className="cta-register" onClick={handleNavigateLogin}>
          Don't have an account? <span>Login</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
