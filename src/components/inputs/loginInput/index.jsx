import { ErrorMessage, useField } from "formik";
import "./style.css";

const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: "translateY(3px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_top"></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: "translateY(1px)" }}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && "63%"}` }}></i>
      )}
    </div>
  );
};

export default LoginInput;
