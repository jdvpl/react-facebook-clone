import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";

import DotLoader from "react-spinners/DotLoader";
import clienteAxios from "../../config/Axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setvisible }) => {
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setlogin] = useState(loginInfos);
  // states for api
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const { email, password } = login;

  // navigation
  const navigate = useNavigate();
  // redux functions
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required").min(6),
  });
  const loginSubmit = async () => {
    try {
      setloading(true);
      const { data } = await clienteAxios.post("/users/login", login);
      console.log(data);
      console.log("data fixed");
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
      setloading(false);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../../assets/icons/facebook.svg" alt="" />
        <span>
          Facebook helps you communicate and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or Phone Number"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
                {error && <div className="error_text">{error}</div>}
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <DotLoader color="#1876f2" loading={loading} size={30} />
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setvisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celerity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
