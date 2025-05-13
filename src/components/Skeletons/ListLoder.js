import React from "react";
import { Box, styled, CardHeader, Skeleton } from "@mui/material";

const MainLoderBox = styled("Box")(({ theme }) => ({
  "& .listLoderBox": {
    "& .MuiCardHeader-root": {
      padding: "0 0 16px 0",
    },
    "& .earnCard": {
      padding: "5px 24px",
      borderRadius: "0px",
      boxShadow: "none",
    },
  },
}));

export default function ListLoder() {
  return (
    <MainLoderBox>
      <Box className="listLoderBox">
        <CardHeader
          title={
            <Skeleton
              animation="wave"
              height={30}
              width="95%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={20} width="60%" />}
        />
      </Box>
    </MainLoderBox>
  );
}
