import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/usecClickOutside";

const CreateComment = ({ user }) => {
  const [picker, setpicker] = useState(false);
  const [cursorPosition, setcursorPosition] = useState();
  const [text, setText] = useState("");
  const [commentImage, setcommentImage] = useState("");
  const [error, seterror] = useState("");

  const textref = useRef(null);
  const emojiPickerRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleEmoji = (e, { emoji }) => {
    const ref = textref.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newtext = start + emoji + end;
    setText(newtext);
    setcursorPosition(start.length + emoji.length);
  };
  useEffect(() => {
    textref.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  useClickOutside(emojiPickerRef, () => {
    setpicker(false);
  });

  const setImage = () => {
    imageInputRef.current.click();
  };
  const handleImageChange = (e) => {
    let file = e.target.files[0];

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/svg" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      seterror(`${file.type} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      seterror(`${file.name} is too large, max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setcommentImage(event.target.result);
    };
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imageInputRef}
            accept="image/*"
            onChange={handleImageChange}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => seterror("")}>
                Try Again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textref}
            value={text}
            placeholder="Write a comment ..."
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setpicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => setImage()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle hover2"
            onClick={() => setcommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
