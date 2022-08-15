import { useEffect } from "react";
import { useCallback } from "react";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import useClickOutside from "../../helpers/usecClickOutside";

const ProfileCover = ({ cover, visitor }) => {
  const [showCoverMenu, setshowCoverMenu] = useState(false);
  const [coverPicture, setcoverPicture] = useState("");
  const [error, seterror] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setwidth] = useState();
  const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);

  const coverRef = useRef(null);
  const inputRef = useRef(null);
  const cropRef = useRef(null);
  useClickOutside(coverRef, () => {
    setshowCoverMenu(false);
  });
  const handleImageChange = (e) => {
    setshowCoverMenu(false);
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
      setcoverPicture(event.target.result);
    };
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setcroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setcoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        seterror(error);
      }
    },
    [croppedAreaPixels]
  );
  useEffect(() => {
    setwidth(cropRef.current.clientWidth);
  }, [window.innerWidth]);
  return (
    <div className="profile_cover" ref={cropRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button className="blue_btn opacity_btn">Cancel</button>
            <button className="blue_btn opacity_btn">Save changes</button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
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
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && <img src={cover} className="cover" />}
      {!visitor && (
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
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCover;
