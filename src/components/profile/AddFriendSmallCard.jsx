import React from "react";

const AddFriendSmallCard = ({ item }) => {
  return (
    <div className="addfriendCard">
      <div className="addfirend_img_small">
        <img src={item.profile_picture} alt="" />
        <div className="addfriend_infos">
          <div className="addfriend_name">
            {item.profile_name.length > 11
              ? item.profile_name.substring(0, 11) + "..."
              : item.profile_name}
          </div>
          <div className="light_blue_btn">
            <img
              src="/assets/icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
