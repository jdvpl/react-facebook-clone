import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import clientAxios from "../../config/Axios";
import { tokenHeaders } from "../../config/headers";
import ActivateForm from "./ActivateForm";
import "./styles.css";
const Activate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    activateAccessToken(token);
  }, []);
  const activateAccessToken = async (token) => {
    try {
      setloading(true);
      const { data } = await clientAxios.post(
        "/users/activate",
        { token },
        tokenHeaders(user.token)
      );
      setsuccess(data.msg);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e) {
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
      setloading(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
