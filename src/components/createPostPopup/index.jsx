import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/usecClickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
const CreatePostPopup = ({ user, setcreatePostVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setshowPrev] = useState(false);
  const [images, setimages] = useState([]);
  const [background, setbackground] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setcreatePostVisible(false);
  });
  const postSubmit = async () => {
    if (background) {
      setloading(true);
      const res = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setloading(false);
      if (res.ok) {
        setbackground("");
        setText("");
        setcreatePostVisible(false);
      } else {
        seterror(res.error);
      }
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} seterror={seterror} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setcreatePostVisible(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_image" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../assets/icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground
              text={text}
              setText={setText}
              user={user}
              showPrev={showPrev}
              background={background}
              setbackground={setbackground}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            showPrev={showPrev}
            setshowPrev={setshowPrev}
            images={images}
            setimages={setimages}
          />
        )}
        <AddToYourPost setshowPrev={setshowPrev} />
        <button
          className={`post_submit ${
            text.length == 0 && "post_submit_disabled"
          }`}
          onClick={() => postSubmit()}
          disabled={loading || text.length == 0}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
