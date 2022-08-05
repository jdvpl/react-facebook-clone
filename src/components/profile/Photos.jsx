import React, { useEffect, useReducer } from "react";
import clientAxios from "../../config/Axios";
import { tokenHeaders } from "../../config/headers";
import { photosReducer } from "../../redux/reducers";

const Photos = ({ userName, user }) => {
  const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: [],
    error: "",
  });
  useEffect(() => {
    getPhotos();
  }, [userName]);

  const getPhotos = async () => {
    try {
      dispatch({
        type: "PHOTOS_REQUEST",
      });
      const info = {
        path: `${userName}/*`,
        sort: "desc",
        max: 30,
      };
      const { data } = await clientAxios.post(
        `/upload/listImages`,
        info,
        tokenHeaders(user.token)
      );
      dispatch({
        type: "PHOTOS_SUCCESS",
        payload: data,
      });
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      dispatch({
        type: "PHOTOS_ERROR",
        payload: errorData,
      });
    }
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
