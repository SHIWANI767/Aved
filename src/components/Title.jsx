import AppContext from "@/context/AppContext";
import { Typography } from "@mui/material";
import React, { useContext } from "react";

const Title = ({ variant = "h3" }) => {
  const auth = useContext(AppContext);

  return (
    <>
      <Typography color="primary" variant={variant} className="nameTexttopbar">
        {auth?.topHeading || "Dashboard"}
      </Typography>
    </>
  );
};

export default Title;
