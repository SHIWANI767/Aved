import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";

const TransactionModalBox = styled(Box)(({ theme }) => ({
  "& .imgBox": {
    maxWidth: "300px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "200px",
      width: "100%",
    },
  },
  "& .mainBox": {
    "& h3": {
      marginTop: "6px",
    },
  },
}));
export default function NoDataFound({ text }) {
  const auth = useContext(AppContext);
  const { topbarHeading } = auth?.languageData?.page || {};

  return (
    <Box className={` displayCenter mainBox`} width="100%" mt={6} mb={4}>
      <Box align="center">
        <img
          src="/images/NoData.png"
          alt="nodata"
          style={{ maxWidth: "350px" }}
          className="imgBox"
        />
        <Typography variant="body2" color="secondary" mt={3}>
          {text ? text : topbarHeading?.noDataFoundText}
        </Typography>
      </Box>
    </Box>
  );
}
