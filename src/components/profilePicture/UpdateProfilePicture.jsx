import Cookies from "js-cookie";
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/UploadImages";
import { updateProfilePictureUser } from "../../functions/user";
import getCroppedImg from "../../helpers/getCroppedImg";

const UpdateProfilePicture = ({ setimage, image, seterror, setshow, pRef }) => {
  const dispatch = useDispatch();
  const [description, setdescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setloading] = useState(false);

  const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setcroppedAreaPixels(croppedAreaPixels);
  }, []);
  const refSlider = useRef(null);
  const zoomOut = () => {
    refSlider.current.stepDown();
    setZoom(refSlider.current.value);
  };
  const zoomIn = () => {
    refSlider.current.stepUp();
    setZoom(refSlider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setimage(img);
        } else {
          return img;
        }
      } catch (error) {
        seterror(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      setloading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateProfilePictureUser(
        res.data[0].url,
        user.token
      );
      if (updated_picture.ok) {
        const dta = await createPost(
          "ProfilePicture",
          null,
          description,
          res.data,
          user.id,
          user.token,
          "textBlack"
        );
        if (dta.ok) {
          pRef.current.style.backgroundImage = `url(${res.data[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res.data[0].url,
            })
          );
          dispatch({ type: "UPDATEPICTURE", payload: res.data[0].url });
          setloading(false);
          setshow(false);
        } else {
          setloading(false);
          seterror(dta.error);
        }
      } else {
        setloading(false);
        seterror(updated_picture.error);
      }
    } catch (e) {
      setloading(false);
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      seterror(error);
    }
  };
  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setimage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          placeholder="Description"
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            ref={refSlider}
            type="range"
            min={1}
            max={3}
            step={0.2}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage(true)}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setimage("")}>
          Cancel
        </div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfilePicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
