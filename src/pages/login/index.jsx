import "./style.css";
import "./register.css";
import LoginForm from "../../components/login/LoginForm";
import LoginFooter from "../../components/login/LoginFooter";
import RegisterForm from "../../components/register/RegisterForm";
import { useState } from "react";
const Login = () => {
  const [visible, setvisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setvisible={setvisible} />
        {visible && <RegisterForm setvisible={setvisible} />}
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
