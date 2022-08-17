import Detail from "./Detail";

const EditDetails = ({ details, setshowVisiblePopupDetails }) => {
  return (
    <div className="blur">
      <div className="postBox infosBox">
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setshowVisiblePopupDetails(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <Detail
            header="Other Name"
            value={details?.otherName}
            img="studies"
            placeholder="Add other Name"
            name="otherName"
          />
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
