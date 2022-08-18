import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clientAxios from "../../config/Axios";
import { tokenHeaders } from "../../config/headers";
import Bio from "./Bio";
import EditDetails from "./EditDetails";
import "./style.css";

const Intro = ({ detailsData, visitor }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setdetails] = useState(detailsData);
  useEffect(() => {
    setdetails(detailsData);
    setinfos(detailsData);
  }, [detailsData]);
  const initial = {
    bio: details?.bio ? details?.bio : "",
    otherName: details?.otherName ? details?.otherName : "",
    job: details?.job ? details?.job : "",
    workplace: details?.workplace ? details?.workplace : "",
    highSchool: details?.highSchool ? details?.highSchool : "",
    college: details?.college ? details?.college : "",
    currentCity: details?.currentCity ? details?.currentCity : "",
    hometown: details?.hometown ? details?.hometown : "",
    relationship: details?.relationship ? details?.relationship : "",
    instagram: details?.instagram ? details?.instagram : "",
  };
  const [infos, setinfos] = useState(initial);
  const [showBioPopup, setshowBioPopup] = useState(false);
  const [maxCharacters, setmaxCharacters] = useState(
    infos?.bio ? 100 - infos?.bio.length : 100
  );
  const [showVisiblePopupDetails, setshowVisiblePopupDetails] = useState(1);

  const updateDetails = async () => {
    try {
      const { data } = await clientAxios.put(
        "/users/updateUserDetails",
        infos,
        tokenHeaders(user.token)
      );
      setshowBioPopup(false);
      setdetails(data);
    } catch (e) {
      console.log(e);
      const error = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfos({ ...infos, [name]: value });
    setmaxCharacters(100 - e.target.value.length);
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBioPopup && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setshowBioPopup(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBioPopup && (
        <div className="info_col">
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setshowBioPopup(true)}
            >
              Add Bio
            </button>
          )}
        </div>
      )}
      {showBioPopup && (
        <Bio
          infos={infos}
          handleChange={handleChange}
          setshowBioPopup={setshowBioPopup}
          maxCharacters={maxCharacters}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="/assets/icons/job.png" alt="" />
          works as {details?.job} at<b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="/assets/icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="/assets/icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}

      {details?.relationship && (
        <div className="info_profile">
          <img src="/assets/icons/relationship.png" alt="" />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="/assets/icons/studies.png" alt="" />
          Studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="/assets/icons/studies.png" alt="" />
          Studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="/assets/icons/home.png" alt="" />
          Lives at {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="/assets/icons/home.png" alt="" />
          From at {details?.hometown}
        </div>
      )}
      {details?.instagram && (
        <div className="info_profile">
          <img src="/assets/icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit Details</button>
      )}
      {showVisiblePopupDetails && !visitor && (
        <EditDetails
          details={details}
          setshowVisiblePopupDetails={setshowVisiblePopupDetails}
          handleChange={handleChange}
          maxCharacters={maxCharacters}
          updateDetails={updateDetails}
          infos={infos}
        />
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}

      {!visitor && (
        <button className="gray_btn hover1 w100">Add Features</button>
      )}
    </div>
  );
};

export default Intro;
