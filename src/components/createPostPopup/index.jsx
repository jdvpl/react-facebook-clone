import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/usecClickOutside";
const CreatePostPopup = ({ user, setcreatePostVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setshowPrev] = useState(false);
  const [images, setimages] = useState([]);
  const [background, setbackground] = useState("");
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setcreatePostVisible(false);
  });
  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
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
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
