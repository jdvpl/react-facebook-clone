import React, { useRef, useState } from "react";
import ProfilePicture from "../profilePicture";

const ProfilePictureInfo = ({ profile, visitor, photos }) => {
  const [show, setshow] = useState(false);
  const pRef = useRef(null);
  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setshow={setshow} pRef={pRef} photos={photos} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setshow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername">
              {profile?.details?.othername &&
                `(${profile?.details?.othername})`}
            </div>
          </div>
          <div className="profile_friend_count">
            {profile.friends?.length} Friends
          </div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {!visitor && (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="/assets/icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit Profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureInfo;
