import { Box, Typography } from "@mui/material";
import React from "react";

export default function NoDataFoundFrame({ data }) {
  return (
    <Box align="center" mt={1} pt={3} pb={3} width="100%">
      <img
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        src={"/images/DarkFrame.png"}
        style={{ maxWidth: "260px" }}
        alt=""
      />
      <Typography
        variant="body1"
        style={{ color: "#6b6b6b", fontSize: "14px" }}
      >
        {data}
      </Typography>
    </Box>
  );
}
