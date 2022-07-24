import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/usecClickOutside";
import { Return, Search } from "../../svg";

const SearchMenu = ({ color, setshowSearchMenu }) => {
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, seticonVisible] = useState(true);
  useClickOutside(menu, () => {
    setshowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setshowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            onFocus={() => seticonVisible(false)}
            onBlur={() => seticonVisible(true)}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a href="">edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_resutls scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
