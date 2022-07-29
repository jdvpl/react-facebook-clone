import { useState, useEffect } from "react";
import Picker from "emoji-picker-react";

const EmojiPickerBackground = ({ text, textref, setText }) => {
  const [picker, setpicker] = useState(false);
  const [cursorPosition, setcursorPosition] = useState();

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
    <div className="post_emojis_wap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../assets/icons/colorful.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={() => {
          setpicker((prev) => !prev);
        }}
      ></i>
    </div>
  );
};

export default EmojiPickerBackground;
