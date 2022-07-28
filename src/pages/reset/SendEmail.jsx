import { Link } from "react-router-dom";
import clientAxios from "../../config/Axios";

const SendEmail = ({
  userInfos,
  setuserInfos,
  setvisible,
  seterror,
  setloading,
  error,
}) => {
  const sendEmail = async () => {
    try {
      setloading(true);
      await clientAxios.post("/users/sendCode", {
        email: userInfos.email,
      });
      setvisible(2);
      seterror("");
    } catch (e) {
      setloading(false);
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset your password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfos?.picture} alt="" />
          <span>{userInfos.email}</span>
          <span>{userInfos.username}</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ paddingLeft: "10px" }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link className="gray_btn" to="/login">
          Not you?
        </Link>
        <button className="blue_btn" type="submit" onClick={() => sendEmail()}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
