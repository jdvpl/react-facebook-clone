import { useState } from "react";
import Bio from "./Bio";
import "./style.css";

const Intro = ({ details, visitor }) => {
  const initial = {
    bio: details?.bio
      ? details?.bio
      : "Software dreamer, I really like to develop my react skills.",
    otherName: details?.otherName ? details?.otherName : "",
    job: details?.job ? details?.job : "",
    workplace: details?.workplace ? details?.workplace : "",
    highSchool: details?.highSchool ? details?.highSchool : "",
    college: details?.college ? details?.college : "",
    currentCity: details?.currentCity ? details?.currentCity : "Bogotá",
    hometown: details?.hometown ? details?.hometown : "Garzon",
    relationship: details?.relationship ? details?.relationship : "Single",
    instagram: details?.instagram ? details?.instagram : "juanda5542",
  };
  const [infos, setinfos] = useState(initial);
  const [showBioPopup, setshowBioPopup] = useState(false);
  const [maxCharacters, setmaxCharacters] = useState(
    infos?.bio ? 100 - infos?.bio.length : 100
  );
  const handleBioChange = (e) => {
    setinfos({ ...infos, bio: e.target.value });
    setmaxCharacters(100 - e.target.value.length);
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos.bio && !showBioPopup && (
        <div className="info_col">
          <span className="info_text">{infos.bio}</span>
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
      {showBioPopup && (
        <Bio
          infos={infos}
          handleBioChange={handleBioChange}
          setshowBioPopup={setshowBioPopup}
          maxCharacters={maxCharacters}
        />
      )}
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="/assets/icons/job.png" alt="" />
          works as {infos.job} at<b>{infos.workplace}</b>
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="/assets/icons/job.png" alt="" />
          works as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="/assets/icons/job.png" alt="" />
            works at {infos.workplace}
          </div>
        )
      )}

      {infos.relationship && (
        <div className="info_profile">
          <img src="/assets/icons/relationship.png" alt="" />
          {infos.relationship}
        </div>
      )}
      {infos.college && (
        <div className="info_profile">
          <img src="/assets/icons/studies.png" alt="" />
          Studied at {infos.college}
        </div>
      )}
      {infos.highSchool && (
        <div className="info_profile">
          <img src="/assets/icons/studies.png" alt="" />
          Studied at {infos.highSchool}
        </div>
      )}
      {infos.currentCity && (
        <div className="info_profile">
          <img src="/assets/icons/home.png" alt="" />
          Lives at {infos.currentCity}
        </div>
      )}
      {infos.hometown && (
        <div className="info_profile">
          <img src="/assets/icons/home.png" alt="" />
          From at {infos.hometown}
        </div>
      )}
      {infos.instagram && (
        <div className="info_profile">
          <img src="/assets/icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {infos.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit Details</button>
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
