import { stories } from "../../data/home";
import { Dots } from "../../svg";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PeopleYouMayKnow = () => {
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_heaer_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
