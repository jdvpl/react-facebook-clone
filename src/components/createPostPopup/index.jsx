import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/usecClickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/UploadImages";
const CreatePostPopup = ({ user, setcreatePostVisible }) => {
  const [text, setText] = useState("");
  const [showPrev, setshowPrev] = useState(false);
  const [images, setimages] = useState([]);
  const [background, setbackground] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [textColor, settexColor] = useState("textBlack");
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
        user.token,
        textColor
      );
      setloading(false);
      if (res.ok) {
        setbackground("");
        setText("");
        setcreatePostVisible(false);
      } else {
        seterror(res.error);
      }
    } else if (images && images.length) {
      setloading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/postImages`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.map((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);
      if (response.ok) {
        const res = await createPost(
          null,
          null,
          text,
          response.data,
          user.id,
          user.token,
          textColor
        );
        if (res.ok) {
          setloading(false);
          setimages([]);
          setText("");
          setcreatePostVisible(false);
        } else {
          setloading(false);
          seterror(res.error);
        }
      } else {
        setloading(false);
        seterror(response.error);
      }
    } else if (text.length > 0) {
      setloading(true);
      const res = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token,
        textColor
      );
      setloading(false);
      if (res.ok) {
        setbackground("");
        setText("");
        setcreatePostVisible(false);
      } else {
        seterror(res.error);
      }
    } else {
      seterror("You should provide something to share.");
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
              settexColor={settexColor}
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
            seterror={seterror}
          />
        )}
        <AddToYourPost setshowPrev={setshowPrev} />
        <button
          className={`post_submit ${
            text.length == 0 && !images.length ? "post_submit_disabled" : ""
          }`}
          onClick={() => postSubmit()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
