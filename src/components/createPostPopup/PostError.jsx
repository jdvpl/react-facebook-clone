import React from "react";

const PostError = ({ error, seterror }) => {
  return (
    <div className="postError">
      <div>{error}</div>
      <button className="blue_btn" onClick={() => seterror("")}>
        Try Again
      </button>
    </div>
  );
};

export default PostError;
