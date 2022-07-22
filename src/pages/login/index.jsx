import "./style.css";
import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
const Login = () => {
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setlogin] = useState(loginInfos);

  const { email, password } = login;

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
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../../assets/icons/facebook.svg" alt="" />
            <span>
              Facebook helps you communicate and share with the people in your
              life.
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
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten password?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page</b> for a celerity, brand or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
        <footer className="login_footer">
          <div className="login_footer_wrap">
            <Link to="/">English (US)</Link>
            <Link to="/">Español</Link>
            <Link to="/">Français (France)</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/">Italiano</Link>
            <Link to="/">Deutsch</Link>
            <Link to="/">العربية</Link>
            <Link to="/">हिन्दी</Link>
            <Link to="/">中文(简体)</Link>
            <Link to="/">日本語</Link>
            <Link to="/" className="footer_square">
              <i className="plus_icon"></i>
            </Link>
          </div>
          <div className="footer_splitter"></div>
          <div className="login_footer_wrap">
            <Link to="/">Sign Up</Link>
            <Link to="/">Log In</Link>
            <Link to="/">Messenger</Link>
            <Link to="/">Facebook Lite</Link>
            <Link to="/">Watch</Link>
            <Link to="/">Places</Link>
            <Link to="/">Games</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Facebook Pay</Link>
            <Link to="/">Oculus</Link>
            <Link to="/">Portal</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Bulletin</Link>
            <Link to="/">Local</Link>
            <Link to="/">Fundraisers</Link>
            <Link to="/">Services</Link>
            <Link to="/">Voting Information Center</Link>
            <Link to="/">Groups</Link>
            <Link to="/">About</Link>
            <Link to="/">Create Ad</Link>
            <Link to="/">Create Page</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
            <Link to="/">
              Ad choices <i className="adChoices_icon"></i>
            </Link>
            <Link to="/">Terms</Link>
            <Link to="/">Help</Link>
            <Link to="/">Contact Uploading & Non-UsersSettings</Link>
            <Link to="/"></Link>
            <Link to="/"></Link>
          </div>
          <div className="login_footer_wrap">
            <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2022
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
