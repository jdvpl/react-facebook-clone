import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import Post from "../../components/post";
import GridPosts from "../../components/profile/GridPosts";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import ProfileCover from "../../components/profile/ProfileCover";
import ProfileMenu from "../../components/profile/ProfileMenu";
import ProfilePictureInfo from "../../components/profile/ProfilePictureInfo";
import clientAxios from "../../config/Axios";
import { tokenHeaders } from "../../config/headers";
import { profileReducer } from "../../redux/reducers";
import "./style.css";

const Profile = ({ setcreatePostVisible }) => {
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
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <ProfileCover cover={profile.cover} />
          <ProfilePictureInfo profile={profile} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left"></div>
              <div className="profile_right">
                <CreatePost
                  user={user}
                  profile={profile}
                  setcreatePostVisible={setcreatePostVisible}
                />
                <GridPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
