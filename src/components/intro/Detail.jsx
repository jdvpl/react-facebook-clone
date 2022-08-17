import { useState } from "react";
import Bio from "./Bio";

const Detail = ({ header, img, value, placeholder, name }) => {
  const [showInput, setshowInput] = useState(true);
  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex no_underline">
        {value ? (
          <div className="info_profile">
            <img src={`/assets/icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            Add {header}
          </>
        )}
      </div>
      {showInput && <Bio placeholder={placeholder} name={name} />}
    </div>
  );
};

export default Detail;