import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
const ChangePassword = ({
  password,
  setpassword,
  confirmPassword,
  setconfirmPassword,
  error,
}) => {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at leat six numbers, letters and punctuation marks( such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password can't be more than 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords muts match"),
  });
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
      >
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
              bottom
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
