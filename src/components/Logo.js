import React from "react";

const Logo = (props) => {
  return (
    <img
      src="/images/logowhite.svg"
      alt="Logo"
      {...props}
      style={{ width: "140px", cursor: "pointer" }}
    />
  );
};

export default Logo;
