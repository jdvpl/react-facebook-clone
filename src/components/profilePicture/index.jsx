import { useRef, useState } from "react";
import useClickOutside from "../../helpers/usecClickOutside";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
const ProfilePicture = ({ setshow, pRef }) => {
  const [image, setimage] = useState("");
  const [error, seterror] = useState("");
  const refFile = useRef(null);
  const popupRef = useRef(null);

  const handleImage = (e) => {
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
      setimage(event.target.result);
    };
  };
  useClickOutside(popupRef, () => {
    setshow(false);
  });
  return (
    <div className="blur">
      <input
        type="file"
        ref={refFile}
        hidden
        onChange={handleImage}
        accept="image/*"
      />
      <div className="postBox pictureBox" ref={popupRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setshow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refFile.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => seterror("")}>
              Try Again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap"></div>
        {image && (
          <UpdateProfilePicture
            setimage={setimage}
            image={image}
            seterror={seterror}
            setshow={setshow}
            pRef={pRef}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
