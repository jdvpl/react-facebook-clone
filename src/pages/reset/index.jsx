import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginFooter from "../../components/login/LoginFooter";
import ChangePassword from "./ChangePassword";
import CodeVerication from "./CodeVerication";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import "./style.css";
const Reset = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setvisible] = useState(3);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [code, setcode] = useState("");
  const [error, seterror] = useState("");
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Cookies.remove("user");
    navigate("/login");
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../assets/icons/facebook.svg" alt="" />

        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user?.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible == 0 && (
          <SearchAccount email={email} setemail={setemail} error={error} />
        )}
        {visible == 1 && <SendEmail user={user} />}
        {visible == 2 && (
          <CodeVerication code={code} setcode={setcode} error={error} />
        )}
        {visible == 3 && (
          <ChangePassword
            password={password}
            setpassword={setpassword}
            confirmPassword={confirmPassword}
            setconfirmPassword={setconfirmPassword}
            error={error}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
};

export default Reset;
