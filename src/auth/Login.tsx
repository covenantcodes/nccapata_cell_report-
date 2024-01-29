import "./Login.css";
import CustomInput from "../Custom/Input/CustomInput";

const Login = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo-container">
          <img src="../../img/church.png" alt="" />
        </div>

        <div className="welcome-text">Welcome Back!</div>

        <CustomInput label="Username" width="300px"/>

        <CustomInput label="Password" width="300px"/>
      </div>
    </div>
  );
};

export default Login;
