import { useState } from "react";
import "./style.css";

const Intro = ({ details }) => {
  const initial = {
    bio: details?.bio ? details?.bio : "",
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

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
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
    </div>
  );
};

export default Intro;
