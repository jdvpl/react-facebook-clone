import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackground = ({ text, user, setText, type2 }) => {
  const [picker, setpicker] = useState(false);
  const [cursorPosition, setcursorPosition] = useState();
  const textref = useRef(null);
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
  return (
    <div className={`${type2 && "images_input"}`}>
      <div className={`${!type2 && "flex_center"}`}>
        <textarea
          ref={textref}
          maxLength="100"
          value={text}
          placeholder={`What's on your mind? ${user.first_name}`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      <div className={`${!type2 && "post_emojis_wap"}`}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="../../../assets/icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 && "moveleft"}`}
          onClick={() => {
            setpicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackground;
