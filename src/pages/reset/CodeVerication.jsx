import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import clientAxios from "../../config/Axios";
const CodeVerication = ({
  code,
  setcode,
  error,
  seterror,
  setloading,
  setvisible,
  userInfos,
}) => {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min(5, "Code must be 5 characters")
      .max(5, "Code must be 5 characters"),
  });

  const verifyCode = async () => {
    try {
      setloading(true);
      await clientAxios.post("/users/validateCode", { id: userInfos.id, code });
      setvisible(3);
      seterror("");
      setloading(false);
    } catch (e) {
      setloading(false);
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setcode(e.target.value)}
              placeholder="Code"
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

export default CodeVerication;
