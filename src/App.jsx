import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CreatePostPopup from "./components/createPostPopup";
import clientAxios from "./config/Axios";
import { tokenHeaders } from "./config/headers";
import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

const reducer = (state, action) => {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" };
    case "POSTS_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
const App = () => {
  const [createPostVisible, setcreatePostVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await clientAxios(
        "/post/getAllPost",
        tokenHeaders(user.token)
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      dispatch({
        type: "POSTS_ERROR",
        payload: errorData,
      });
    }
  };
  console.log(posts);
  return (
    <div>
      {createPostVisible && (
        <CreatePostPopup
          user={user}
          setcreatePostVisible={setcreatePostVisible}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route
            path="/"
            element={
              <Home setcreatePostVisible={setcreatePostVisible} posts={posts} />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
      </Routes>
    </div>
  );
};

export default App;
