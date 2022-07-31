import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import useClickOutside from "../../helpers/usecClickOutside";

const EmojiPickerBackground = ({
  text,
  user,
  setText,
  type2,
  background,
  setbackground,
  settexColor,
}) => {
  const [picker, setpicker] = useState(false);
  const [cursorPosition, setcursorPosition] = useState();
  const [showBgs, setshowBgs] = useState(false);

  const textref = useRef(null);
  const bgRef = useRef(null);
  const iconRef = useRef(null);
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

  const postBackgrounds = [
    "../../../assets/images/postBackgrounds/1.jpg",
    "../../../assets/images/postBackgrounds/2.jpg",
    "../../../assets/images/postBackgrounds/3.jpg",
    "../../../assets/images/postBackgrounds/4.jpg",
    "../../../assets/images/postBackgrounds/5.jpg",
    "../../../assets/images/postBackgrounds/6.jpg",
    "../../../assets/images/postBackgrounds/7.jpg",
    "../../../assets/images/postBackgrounds/8.jpg",
    "../../../assets/images/postBackgrounds/9.jpg",
    "../../../assets/images/postBackgrounds/10.jpg",
    "../../../assets/images/postBackgrounds/11.jpg",
    "../../../assets/images/postBackgrounds/12.webp",
    "../../../assets/images/postBackgrounds/13.jpg",
    "../../../assets/images/postBackgrounds/14.jpg",
    "../../../assets/images/postBackgrounds/15.jpg",
    "../../../assets/images/postBackgrounds/16.jpg",
    "../../../assets/images/postBackgrounds/17.jpg",
  ];

  const backgroundHandler = (i) => {
    textref.current.focus();
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setbackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
    if (i == 1 || i == 6 || i == 9 || i == 14) {
      bgRef.current.classList.remove("bgHandlerColorWhite");
      settexColor("textBlack");
    } else {
      bgRef.current.classList.add("bgHandlerColorWhite");
      settexColor("textWhite");
    }
  };

  const removeBg = () => {
    textref.current.focus();
    bgRef.current.style.backgroundImage = "";
    setbackground("");
    bgRef.current.classList.remove("bgHandlerColorWhite");
    bgRef.current.classList.remove("bgHandler");
  };
  useClickOutside(iconRef, () => {
    setpicker(false);
  });
  return (
    <div className={`${type2 && "images_input"}`}>
      <div className={`${!type2 && "flex_center"}`} ref={bgRef}>
        <textarea
          ref={textref}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind? ${user.first_name}`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textref.current.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>

      <div className={`${!type2 && "post_emojis_wap"}`} ref={iconRef}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../assets/icons/colorful.png"
            alt=""
            onClick={() => setshowBgs((prev) => !prev)}
          />
        )}

        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div
              className="no_bg"
              onClick={() => {
                removeBg();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                className={i}
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}
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
