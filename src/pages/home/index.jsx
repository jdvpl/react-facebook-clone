import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import Post from "../../components/post";
import "./styles.css";
const Home = ({ setcreatePostVisible, posts }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setheight] = useState();
  useEffect(() => {
    setheight(middle.current.clientHeight);
  }, []);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setcreatePostVisible={setcreatePostVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
