import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const RootContainer = styled("div")`
  .loader {
    position: absolute;
    width: 320px;
    height: 240px;
    left: 60%;
    top: 60%;
    margin-left: -160px;
    margin-top: -120px;
    border-radius: 4px;
    transition: opacity 400ms;
  }
`;
export default function NewLoader() {
  return (
    <RootContainer>
      <div class="loader">
        <Typography variant="h4" color="primary">
          Loading...
        </Typography>
      </div>
    </RootContainer>
  );
}
