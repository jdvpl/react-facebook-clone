const ReactsPopup = ({ visible, setvisible }) => {
  const reactsArray = [
    { name: "like", image: "../../../assets/reacts/like.gif" },
    { name: "love", image: "../../../assets/reacts/love.gif" },
    { name: "haha", image: "../../../assets/reacts/haha.gif" },
    { name: "wow", image: "../../../assets/reacts/wow.gif" },
    { name: "sad", image: "../../../assets/reacts/sad.gif" },
    { name: "angry", image: "../../../assets/reacts/angry.gif" },
    { name: "smiley", image: "../../../assets/reacts/smiley.gif" },
    { name: "thinking", image: "../../../assets/reacts/think.gif" },
    { name: "horns", image: "../../../assets/reacts/horns.gif" },
    { name: "party", image: "../../../assets/reacts/party.gif" },
    { name: "rock", image: "../../../assets/reacts/rock.gif" },
    { name: "otaku", image: "../../../assets/reacts/otaku.gif" },
    { name: "fight", image: "../../../assets/reacts/fight.gif" },
    { name: "lazy", image: "../../../assets/reacts/lazy.gif" },
    { name: "sleepy", image: "../../../assets/reacts/sleepy.gif" },
  ];
  return (
    visible && (
      <div
        className="reacts_popup"
        onMouseOver={() =>
          setTimeout(() => {
            setvisible(true);
          }, 500)
        }
        onMouseLeave={() =>
          setTimeout(() => {
            setvisible(false);
          }, 500)
        }
      >
        {reactsArray.map((react, i) => (
          <div className="react" key={i}>
            <img src={react.image} alt="" />
          </div>
        ))}
      </div>
    )
  );
};

export default ReactsPopup;
