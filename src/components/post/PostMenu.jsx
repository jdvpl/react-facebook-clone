import { useState } from "react";
import MenuItem from "./MenuItem";

const PostMenu = ({ userId, postUserId, imagesLength }) => {
  const [isUserPost, setisUserPost] = useState(userId === postUserId);
  return (
    <ul className="post_menu">
      {isUserPost && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items"
      />
      <div className="line"></div>
      {isUserPost && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!isUserPost && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && <MenuItem icon="download_icon" title="Download" />}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Full Screen" />
      )}
      {isUserPost && (
        <MenuItem img="/assets/icons/lock.png" title="Edit Audience" />
      )}
      {isUserPost && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {isUserPost && (
        <MenuItem icon="delete_icon" title="Turn off translations" />
      )}
      {isUserPost && <MenuItem icon="date_icon" title="Edit Date" />}
      {isUserPost && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {isUserPost && <MenuItem icon="archive_icon" title="Move to archive" />}
      {isUserPost && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="Items in your trash are deleted after 30 days"
        />
      )}
      {!isUserPost && <div className="line"></div>}
      {!isUserPost && (
        <MenuItem
          img="/assets/icons/report.png"
          title="Report Post"
          subtitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
};

export default PostMenu;
