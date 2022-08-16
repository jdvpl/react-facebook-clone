import { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/usecClickOutside";

const OldCovers = ({ setshowOldCoverPictures, photos, setcoverPicture }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const selectedOldCoverRef = useRef(null);
  useClickOutside(selectedOldCoverRef, () => {
    setshowOldCoverPictures(false);
  });
  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={selectedOldCoverRef}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setshowOldCoverPictures(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Select Photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile pictures</h4>
          <div className="old_pictures">
            {photos.length &&
              photos
                .filter(
                  (img) =>
                    img.folder ===
                    `facebook-jdvpl/${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    onClick={() => {
                      setcoverPicture(photo.secure_url);
                      setshowOldCoverPictures(false);
                    }}
                  />
                ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) =>
                  img.folder !==
                  `facebook-jdvpl/${user.username}/cover_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  onClick={() => {
                    setcoverPicture(photo.secure_url);
                    setshowOldCoverPictures(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;
