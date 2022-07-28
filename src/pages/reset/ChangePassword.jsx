import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";

const ChangePassword = ({
  password,
  setpassword,
  confirmPassword,
  setconfirmPassword,
  error,
}) => {
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password.</div>
      <Formik enableReinitialize initialValues={{ password, confirmPassword }}>
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="New Passwod"
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setconfirmPassword(e.target.value)}
              placeholder="Confirm new passwod"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link className="gray_btn" to="/login">
                Cancel
              </Link>
              <button className="blue_btn" type="submit">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
