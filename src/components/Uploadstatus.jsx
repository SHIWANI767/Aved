import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Progressbar from "./Progressbar";
import { IoClose } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

export default function Uploadstatus() {
  return (
    <Box position="relative">
      <div className="labelprogressBox">
        <IoClose style={{ color: "#7A69FE" }} className="closeIconBox" />
        <Box className="displayStart">
          <Box>
            <Box className="circlemainBox displayCenter">
              <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/planner.svg" alt="image" />
            </Box>
          </Box>

          <Box width="100%" ml={3}>
            <Typography variant="h6">Care Plan - Robert Planner</Typography>
            {/* <BorderLinearProgress variant="determinate" value={50} /> */}
            <Box align="right" mt={2} mb={1}>
              <Typography variant="body2" color="#7A69FE">
                69%
              </Typography>
            </Box>
            <Progressbar />
          </Box>
        </Box>
      </div>

      <Box className="labelprogressBox" mt={2} position="relative">
        <AiOutlineCheck
          style={{ color: "#02BC7D" }}
          className="closeIconBox greenclose"
        />
        <Box className="displayStart">
          <Box>
            <Box className="circlemainBox displayCenter">
              <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/planner.svg" alt="image" />
            </Box>
          </Box>

          <Box width="100%" ml={3}>
            <Typography variant="h6">Care Plan - Robert Planner</Typography>
            {/* <BorderLinearProgress variant="determinate" value={50} /> */}
            <Box mt={1} mb={1}>
              <Typography variant="body2" color="#7A69FE">
                500 kb
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
