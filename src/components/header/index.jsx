import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import "./style.css";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/usecClickOutside";
import UserMenu from "./userMenu";
const Header = ({ page }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [showSearchMenu, setshowSearchMenu] = useState(false);
  const [showAllMenu, setshowAllMenu] = useState(false);
  const [showUserMenu, setshowUserMenu] = useState(false);

  const allmenu = useRef(null);
  const usermenu = useRef(null);

  useClickOutside(allmenu, () => {
    setshowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setshowUserMenu(false);
  });
  const color = "#65676b";
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setshowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setshowSearchMenu={setshowSearchMenu} />
      )}
      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : ""}`}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          ref={allmenu}
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
        >
          <div onClick={() => setshowAllMenu((prev) => !prev)}>
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu setshowAllMenu={setshowAllMenu} />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={usermenu}
        >
          <div onClick={() => setshowUserMenu((prev) => !prev)}>
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
            {showUserMenu && <UserMenu user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
