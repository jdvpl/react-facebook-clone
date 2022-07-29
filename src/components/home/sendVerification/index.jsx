import "./style.css";
import { useState } from "react";
import clientAxios from "../../../config/Axios";
import { tokenHeaders } from "../../../config/headers";

const SendVerification = ({ user }) => {
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const sendVerificationLink = async () => {
    try {
      const { data } = await clientAxios(
        "/users/sendVerification",
        tokenHeaders(user.token)
      );
      setsuccess(data.msg);
    } catch (e) {
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        a month from creating.
      </span>
      <a href="#" onClick={() => sendVerificationLink()}>
        Click here to resend verification link.
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
