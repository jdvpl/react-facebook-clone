import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios from "../../config/Axios";
import { tokenHeaders } from "../../config/headers";
import { profileReducer } from "../../redux/reducers";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  let userName = username === undefined ? user.username : username;

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await clientAxios(
        `/users/getProfile/${userName}`,
        tokenHeaders(user.token)
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      dispatch({
        type: "PROFILE_ERROR",
        payload: errorData,
      });
    }
  };
  console.log(profile);
  return <div>Profile</div>;
};

export default Profile;
