import { Box, Typography } from "@mui/material";
import React from "react";

export default function NoCartFound({ text }) {
  return (
    <Box
      display="flex"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box align="center" pt={12} pb={2} pr={8}>
        <img
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          src={"/images/NoCart.png"}
          style={{ maxWidth: "350px" }}
          alt=""
        />
        <Typography variant="body2" color="secondary" mt={3}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
