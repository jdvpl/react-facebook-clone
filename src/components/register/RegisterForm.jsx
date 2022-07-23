import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
const RegisterForm = () => {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setuser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleRegisterChane = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  // validations
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, "Fisrt name must be between 2 and 40 characters.")
      .max(40, "Fisrt name must be between 2 and 40 characters.")
      .matches(
        /^[aA-zZ\s]*$/,
        "Number and especial characters are not allowed."
      ),
    last_name: Yup.string()
      .required("What's your last name?")
      .min(2, "Last name must be between 2 and 40 characters.")
      .max(40, "Last name must be between 2 and 40 characters.")
      .matches(
        /^[aA-zZ\s]*$/,
        "Number and especial characters are not allowed."
      ),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password"
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at leat six numbers, letters and punctuation marks( such as ! and &)"
      )
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password can't be more than 40 characters"),
  });
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
        >
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
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChane}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChane}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChane}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
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