import React from "react";

import Topbar from "./Topbar";
import { Box } from "@mui/material";
import { styled } from "@mui/system"; // Correct import for styled
import NewFooter from "./NewFooter";

const HomelayoutmainBox = styled(Box)(({ theme }) => ({
  "& .mainLayout-box": {
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    backgroundSize: "cover",
    background: "#fff",
    // backgroundImage: "url(/images/banner_lnding.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .pageSection": {
    position: "relative",
    minHeight: "70vh !important",
  },
}));

export default function HomeLayout({ children }) {
  return (
    <HomelayoutmainBox>
      <div className="mainLayout-box">
        <Topbar />
        <Box className="pageSection">{children}</Box>
        <NewFooter />

      </div>
    </HomelayoutmainBox>
  );
}
