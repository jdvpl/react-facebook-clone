import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import clientAxios from "../../config/Axios";
const SearchAccount = ({
  email,
  setemail,
  error,
  setloading,
  seterror,
  setuserInfos,
  setvisible,
}) => {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(50, "Email address can't be more than 50 characters"),
  });
  const handleSearch = async () => {
    try {
      setloading(true);
      const { data } = await clientAxios.post("/users/findUser", { email });

      setuserInfos(data);
      setvisible(1);
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
    <div className="reset_form">
      <div className="reset_form_header">Find your account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email address or mobile number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link className="gray_btn" to="/login">
                Cancel
              </Link>
              <button className="blue_btn" type="submit">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchAccount;
