import { useEffect } from "react";
import { useCallback } from "react";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/UploadImages";
import { updateCoverPictureUser } from "../../functions/user";
import getCroppedImg from "../../helpers/getCroppedImg";
import useClickOutside from "../../helpers/usecClickOutside";
import OldCovers from "./OldCovers";

const ProfileCover = ({ cover, visitor, photos }) => {
  const [showCoverMenu, setshowCoverMenu] = useState(false);
  const [coverPicture, setcoverPicture] = useState("");
  const [error, seterror] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setwidth] = useState();
  const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);
  const [loading, setloading] = useState(false);
  const [showOldCoverPictures, setshowOldCoverPictures] = useState(false);

  const coverRef = useRef(null);
  const inputRef = useRef(null);
  const cropRef = useRef(null);
  const coverImgRef = useRef(null);

  const { user } = useSelector((state) => ({ ...state }));
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

  const updateCoverPicture = async () => {
    try {
      setloading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateCoverPictureUser(
        res.data[0].url,
        user.token
      );
      if (updated_picture.ok) {
        const dta = await createPost(
          "cover",
          null,
          null,
          res.data,
          user.id,
          user.token,
          "textBlack"
        );
        if (dta.ok) {
          setcoverPicture("");
          setloading(false);
          setTimeout(() => {
            coverImgRef.current.src = res.data[0].url;
          }, 1000);
        } else {
          setloading(false);
          seterror(dta.error);
        }
      } else {
        setloading(false);
        seterror(updated_picture.error);
      }
    } catch (e) {
      console.log(e);
      setloading(false);
      const errorD = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(errorD);
    }
  };
  return (
    <div className="profile_cover" ref={cropRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setcoverPicture("")}
            >
              Cancel
            </button>
            <button
              className="blue_btn opacity_btn"
              onClick={() => updateCoverPicture()}
              disabled={loading}
            >
              {loading ? (
                <PulseLoader color="#fff" size={5} />
              ) : (
                " Save changes"
              )}
            </button>
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
      {cover && !coverPicture && (
        <img src={cover} className="cover" ref={coverImgRef} />
      )}
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
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setshowOldCoverPictures(true)}
              >
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
      {showOldCoverPictures && (
        <OldCovers
          setshowOldCoverPictures={setshowOldCoverPictures}
          photos={photos}
          setcoverPicture={setcoverPicture}
        />
      )}
    </div>
  );
};

export default ProfileCover;
