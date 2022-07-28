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

  const [visible, setvisible] = useState(0);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [code, setcode] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [userInfos, setuserInfos] = useState({});
  const [success, setsuccess] = useState("");
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
          <SearchAccount
            email={email}
            setemail={setemail}
            error={error}
            setloading={setloading}
            seterror={seterror}
            setuserInfos={setuserInfos}
            setvisible={setvisible}
          />
        )}
        {visible == 1 && userInfos && (
          <SendEmail
            userInfos={userInfos}
            error={error}
            seterror={seterror}
            setloading={setloading}
            setuserInfos={setuserInfos}
            setvisible={setvisible}
          />
        )}
        {visible == 2 && (
          <CodeVerication
            code={code}
            setcode={setcode}
            error={error}
            seterror={seterror}
            setloading={setloading}
            setvisible={setvisible}
            userInfos={userInfos}
          />
        )}
        {visible == 3 && (
          <ChangePassword
            password={password}
            setpassword={setpassword}
            confirmPassword={confirmPassword}
            setconfirmPassword={setconfirmPassword}
            error={error}
            seterror={seterror}
            setloading={setloading}
            setvisible={setvisible}
            userInfos={userInfos}
            success={success}
            setsuccess={setsuccess}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
};

export default Reset;
