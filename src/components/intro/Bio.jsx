const Bio = ({
  infos,
  handleChange,
  setshowBioPopup,
  maxCharacters,
  updateDetails,
  placeholder,
  name,
  detail,
  setshowInput,
}) => {
  return (
    <div className="add_bio_wrap">
      <textarea
        placeholder={placeholder}
        name={name}
        value={infos?.[name]}
        maxLength="100"
        className="textarea_blue details_input"
        onChange={handleChange}
      ></textarea>
      {!detail && (
        <div className="remaining">{maxCharacters} Characters remaining</div>
      )}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i> Public
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() =>
              !detail ? setshowBioPopup(false) : setshowInput(false)
            }
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateDetails();
              setshowInput(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
