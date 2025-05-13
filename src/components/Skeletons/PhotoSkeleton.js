import React from "react";
import { Box, Paper, styled } from "@mui/material";

const MainBox = styled("Box")(({ theme }) => ({
  PostBox: {
    backgroundColor: "theme",
    position: "relative",

    "& .MuiCardHeader-root": {
      padding: "0 0 16px 0",
    },
    "& .MuiCardContent-root": {
      padding: "16px 16px 16px 0",
    },
  },
  postImg: {
    height: 327,
  },
  postImg1: {
    height: 130,
  },
}));
export default function PhotoSkeleton({ type }) {
  // const classes = useStyles();

  return (
    <Box className={"classes.PostBox"}>
      {/* <Skeleton
        animation="wave"
        variant="rect"
        className={type === "horseCard" ? classes.postImg1 : classes.postImg}
        style={
          type === "phototab"
            ? { height: "300px" }
            : type === "horseCard"
            ? { height: "130px", borderRadius: "10px" }
            : { borderRadius: "20px", height: "270px" }
        }
      /> */}
    </Box>
  );
}
