import { Box, CardHeader, Skeleton } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .PostBox": {
    marginTop: "15px",
    "& .MuiCardHeader-root": {
      padding: "0 0 8px 0",
    },
    "& .MuiCardContent-root": {
      padding: "16px 16px 16px 0",
    },
    "& .eventBox": {
      width: "140px",
      height: "140px",
      borderRadius: "10px",
    },
  },
}));

export default function CommentListSkeleton({ type }) {
  return (
    <MainComponent>
      <Box className="PostBox">
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circle" className="circleBox" />
          }
          title={
            <Skeleton
              animation="wave"
              height={20}
              width={"60%"}
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={15} width="30%" />}
        />
      </Box>
    </MainComponent>
  );
}
