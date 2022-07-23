import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";

const RegisterForm = () => {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: "",
    bMonth: "",
    bDay: "",
    gender: "",
  };
  const [user, setuser] = useState(userInfos);
  const handleRegisterChane = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik>
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChane}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChane}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChane}
                />
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChane}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay">
                    <option value="15">15</option>
                  </select>
                  <select name="bMonth">
                    <option value="15">15</option>
                  </select>
                  <select name="bYear">
                    <option value="15">15</option>
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                      onChange={handleRegisterChane}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                      onChange={handleRegisterChane}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      value="custom"
                      id="custom"
                      onChange={handleRegisterChane}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span> Terms, Privacy Policy</span> and{" "}
                <span> Cookies Policy.</span> You may receive SMS Notifications
                from us and can opt out any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
