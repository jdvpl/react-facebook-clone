import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import clientAxios from "../../config/Axios";
const ChangePassword = ({
  password,
  setpassword,
  confirmPassword,
  setconfirmPassword,
  error,
  seterror,
  setloading,
  userInfos,
  success,
  setsuccess,
}) => {
  const navigate = useNavigate();
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

  const changePassword = async () => {
    try {
      setloading(true);
      const { data } = await clientAxios.put("/users/changePassword", {
        email: userInfos.email,
        password,
      });
      seterror("");
      setloading(false);
      setsuccess(data.msg);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e) {
      console.log(e);
      setloading(false);
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
    }
  };
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
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
            {success && <div className="success_text">{success}</div>}
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
