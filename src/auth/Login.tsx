import "./Login.css";
import CustomInput from "../Custom/Input/CustomInput";
import CustomButton from "../Custom/Button/CustomButton";

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

        <CustomButton
            border="none"
            color="white"
            padding="1rem"
            onClick={()=> console.log("Clicked!")}
            radius="5px"
            children="Submit"
            bgcolor="var(--primary-color)"
            width="320px"
        />
      </div>
    </div>
  );
};

export default Login;
