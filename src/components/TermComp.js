import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { btnArr } from "@/data";

const MainBox = styled("Box")(({ theme }) => ({
  "& span": {
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px !important",
    fontWeight: "300 !important",
    whiteSpace: "pre",
    [`@media (max-width: 767px)`]: {
      fontSize: "11px !important",
      fontWeight: "300 !important",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function TermComp({ isShow }) {
  const router = useRouter();

  return (
    <MainBox>
      <Box className="displayCenter" mt={1}>
        {/* <Box>
          {isShow && (
            <span
              variant="text"
              onClick={() => {
                router.push("/auth/forgot-password");
              }}
            >
              Forget Password?
            </span>
          )}
        </Box> */}
        <Box className="displayStart">
          {btnArr.map((item) => (
            <span
              key={item.name}
              variant="text"
              onClick={() => {
                router.push(item.route);
              }}
              padding="0px 0px 0px 20px"
            >
              {item.name}
            </span>
          ))}
        </Box>
      </Box>
    </MainBox>
  );
}

export default TermComp;
