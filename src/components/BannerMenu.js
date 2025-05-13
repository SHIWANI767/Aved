import React from "react";
import { Box } from "@mui/material";

const BannerMenu = () => {
  return (
    <Box className="secureBanner">
      <Box class="main-navigation">
        {/* <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/secure/img.png"
            className="bgcircular bgx2"
            alt=" "
          />
        </Box> */}
        <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/banner/frame1.png"
            className="bgcircular bgx2"
            alt=" "
          />
        </Box>
        <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/banner/bgCircular_22.png"
            className="bgcircular "
            alt=" "
          />
        </Box>
        {/* <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/banner/bgCircular5.png"
            className="bgcircular bgx2"
            alt=" "
          />
        </Box> */}
        <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/banner/frame2.png"
            className="bgcircular bgx1"
            alt=" "
          />
        </Box>
        {/* <Box className="bgImagecir">
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
            src="images/banner/bgCircular_1.png"
            className="bgcircular star"
            alt=" "
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default BannerMenu;
