import React, { useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutside from "../../helpers/usecClickOutside";

const Home = () => {
  const el = useRef(null);
  const [visible, setvisible] = useState(true);
  useClickOutside(el, () => {
    setvisible(false);
  });

  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};

export default Home;
