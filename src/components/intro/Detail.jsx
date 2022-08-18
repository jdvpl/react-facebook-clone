import { useState } from "react";
import Bio from "./Bio";

const Detail = ({
  header,
  img,
  value,
  placeholder,
  name,
  handleChange,
  maxCharacters,
  updateDetails,
  infos,
  text,
}) => {
  const [showInput, setshowInput] = useState(false);
  return (
    <div>
      <div className="details_header">{header}</div>
      <div className="add_details_flex " onClick={() => setshowInput(true)}>
        {value ? (
          <div className="info_profile">
            <img src={`/assets/icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          !showInput && (
            <>
              <i className="rounded_plus_icon"></i>
              <span className="underline">Add {text}</span>
            </>
          )
        )}
      </div>
      {showInput && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          maxCharacters={maxCharacters}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setshowInput={setshowInput}
        />
      )}
    </div>
  );
};

export default Detail;
