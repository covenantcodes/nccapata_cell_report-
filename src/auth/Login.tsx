import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider.tsx";
import "./Login.css";
import "../Custom/Input/CustomInput.css";
import CustomButton from "../Custom/Button/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import {isEmail} from "validator"
import axios from "../api/axios.tsx";

const LOGIN_URL = "/auth/signin";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const [isEye, setIsEye] = useState(true);

  const handleIconClick = () => {
    setIsEye((prevIsEye) => !prevIsEye);
  };

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data.roles;
      setAuth({ user, pwd, roles, accessToken });
      setSuccess(true);
      setUser("");
      setPwd("");
      setSuccess(true);

      navigate("/Dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Network error. Please try again later.");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (userRef.current) {
        userRef.current.focus();
      }
    }
  };

  const handleNavigateRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="main-container">
      {success ? (
        <div className="login-container">
          <h1>You're logged in!</h1>
          <br />
        </div>
      ) : (
        <div className="login-container">
          <div className="logo-container">
            <img src="../../img/church.png" alt="" />
          </div>

          <div className="welcome-text">Welcome Back!</div>
          <div className="motivation">...making disciples of all nations</div>

          <div className="custom-input">
            <p
              ref={errRef}
              className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <input
              type="text"
              placeholder="Username"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>

          <div className="password-input-container custom-input">
            <input
              type={isEye ? "password" : "text"}
              placeholder="Password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
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
            onClick={(e) => handleLogin(e)}
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
    </div>
  );
};

export default Login;
