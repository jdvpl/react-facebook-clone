import { useField } from "formik";
import "./style.css";

const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
    </div>
  );
};

export default LoginInput;
