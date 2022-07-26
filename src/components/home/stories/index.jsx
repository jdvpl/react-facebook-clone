import { ArrowRight, Plus } from "../../../svg";
import "./styles.css";
import { stories } from "../../../data/home";
import Story from "./Story";
const Stories = () => {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../../assets/images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create story</div>
      </div>
      {stories.map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
