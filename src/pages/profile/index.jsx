import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import Post from "../../components/post";
import Friends from "../../components/profile/Friends";
import GridPosts from "../../components/profile/GridPosts";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import Photos from "../../components/profile/Photos";
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
  const visitor = userName === user.username ? false : true;
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <ProfileCover cover={profile.cover} visitor={visitor} />
          <ProfilePictureInfo profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {!visitor && <PeopleYouMayKnow />}
            <div className="profile_grid">
              <div className="profile_left">
                <Photos userName={userName} user={user} />
                <Friends friends={profile?.friends} />
                <div className="relativa_fb_copyright">
                  <Link to="/">Privacy </Link> <span>. </span>
                  <Link to="/">Terms </Link> <span>. </span>
                  <Link to="/">Advertising </Link> <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/">Cookies </Link> <span>. </span>
                  <Link to="/">More </Link> <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile={profile}
                    setcreatePostVisible={setcreatePostVisible}
                  />
                )}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post.id} profile />
                    ))
                  ) : (
                    <div className="no_post">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
