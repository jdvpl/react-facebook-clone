import { useRef, useState } from "react";
import useClickOutside from "../../helpers/usecClickOutside";

const ProfileCover = ({ cover }) => {
  const [showCoverMenu, setshowCoverMenu] = useState(false);

  const coverRef = useRef(null);
  useClickOutside(coverRef, () => {
    setshowCoverMenu(false);
  });
  return (
    <div className="profile_cover">
      {cover && <img src={cover} className="cover" />}
      <div className="update_cover_wrapper" ref={coverRef}>
        <div
          className="open_cover_update"
          onClick={() => setshowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMenu && (
          <div className="open_cover_menu">
            <div className="open_cover_menu_item hover1">
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div className="open_cover_menu_item hover1">
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCover;
