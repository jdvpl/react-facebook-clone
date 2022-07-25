import { useState } from "react";
import { Link } from "react-router-dom";
import { left } from "../../../data/home";
import { ArrowDown1 } from "../../../svg";
import LeftLink from "./LeftLink";
import ShortCut from "./ShortCut";
import "./style.css";

const LeftHome = ({ user }) => {
  const [visible, setvisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          notification={link.notification}
          text={link.text}
        />
      ))}
      {!visible && (
        <div className="left_link hover1" onClick={() => setvisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}

      {visible && (
        <div className="more_lefft">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              notification={link.notification}
              text={link.text}
            />
          ))}
          <div className="left_link hover1" onClick={() => setvisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <ShortCut
          link="https://www.youtube.com/channel/UCPSbosGqV3WDkdfwGA53u2Q"
          img="../../../../assets/images/ytb.png"
          name="My Youtube Channel"
        />
        <ShortCut
          link="https://www.instagram.com/juanda5542/"
          img="../../../../assets/images/insta.png"
          name="My Instagram"
        />
        <ShortCut
          link="https://twitter.com/juandan94967565"
          img="../../../../assets/images/twitter.png"
          name="My Twitter"
        />
      </div>
      <div className={`fb_copyright ${visible && "relativa_fb_copyright"}`}>
        <Link to="/">Privacy </Link> <span>. </span>
        <Link to="/">Terms </Link> <span>. </span>
        <Link to="/">Advertising </Link> <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{" "}
        </Link>
        <span>. </span>
        <Link to="/">Cookies </Link> <span>. </span>
        <Link to="/">More </Link> <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
};

export default LeftHome;
