import { Link } from "react-router-dom";

const SendEmail = ({ user }) => {
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
              <span>kakaroto@kakaroto.com</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={user?.picture} alt="" />
          <span>kakaroto@kakaroto.com</span>
          <span>Faceook user</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link className="gray_btn" to="/login">
          Not you?
        </Link>
        <button className="blue_btn" type="submit">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
