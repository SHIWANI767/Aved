import HomeLayout from "@/layout/HomeLayout";
import { Typography, Box, Paper, Divider, Checkbox } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { CiFilter } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const ProfileBox = styled(Box)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: "#7A69FE",
  },
  "& .documentBox": {
    padding: "10px",
    overflow: "hidden",
    borderRadius: "10px",
    height: "calc(100vh - 299px)",
  },
}));
export default function Filter({ data }) {
  return (
    <ProfileBox>
      <Paper elevation={1} className="documentBox">
        <Box className="displayStart">
          <FiFilter color="gray" fontSize="18px" />
          &nbsp;&nbsp;
          <Typography variant="body2">Filter</Typography>
        </Box>
        <Box>
          <Divider
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              marginTop: "30px",
            }}
          />
        </Box>
        <Box className="subHeading">
          <Typography variant="body1">File type</Typography>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          &nbsp;
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/doc-img.jpg" width="14px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Document</Typography>
          </Box>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} /> &nbsp;
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/pdf-image.jpg" width="14px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Photo</Typography>
          </Box>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          &nbsp;
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/pdf-image.jpg" width="14px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Music</Typography>
          </Box>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          &nbsp;
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/pdf-image.jpg" width="14px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Video</Typography>
          </Box>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          &nbsp;
          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/pdf-image.jpg" width="14px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Presentation</Typography>
          </Box>
        </Box>
        <Box className="subHeading">
          <Typography variant="body1">Creators</Typography>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          <AiOutlineUser fontSize="20px" />

          <Box ml={1}>
            <Typography variant="subTitle1">Document</Typography>
          </Box>
        </Box>
        <Box className="displayStart">
          <Checkbox {...label} />
          <HiOutlineUserGroup fontSize="20px" />
          <Box ml={1}>
            <Typography variant="subTitle1">Document</Typography>
          </Box>
        </Box>
      </Paper>
    </ProfileBox>
  );
}

Filter.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
