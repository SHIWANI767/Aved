import HomeLayout from "@/layout/HomeLayout";
import {
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { MdSwapVert } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
const ProfileBox = styled(Box)(({ theme }) => ({
  "& .paperBox": {
    padding: "10px",
    border: "0.5px solid rgba(0, 0, 0, 0.25)",
    background: "#FFF",
    "& .MuiInput-root ": {
      height: "40px",
    },
    "& .MuiInput-input": {
      fontWeight: "300",
    },
    "& h5": {
      color: "#161E29",
    },
    "& .searchBox": {
      "& button": {
        background: "transparent !important",
      },
      "& svg": {
        fontSize: "20px",
      },
    },
    "& .filtersButton": {
      marginLeft: "20px",
      "& .filterIcon": {
        "& button": {
          background: "#f5f5f5!important",
          width: "37px",
          height: "37px",
          borderRadius: "8px",
          border: "1px solid #8080803d",
          marginRight: "9px",
          padding: "0px",
          "& svg": {
            color: "gray !important",
          },
        },
      },
    },
  },
}));
export default function RecentDocumentFilter({ title }) {
  return (
    <ProfileBox>
      <Paper elevation={1} className="paperBox">
        <Box className="displaySpacebetween displayWrap">
          <Typography variant="h5">{title}</Typography>
          <Box className="displayStart displayWrap">
            <Box className="searchBox">
              <FormControl fullWidth>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  placeholder="Search here.."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box className="sendButton">
                          <IconButton>
                            <SearchIcon
                              sx={{
                                color: "rgba(0, 0, 0, 0.60)",
                                fontSize: "30px",
                              }}
                            />
                          </IconButton>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>
            <Box className={`filtersButton displaySpacebetween`}>
              <Box className="filterIcon">
                <IconButton>
                  <FiFilter />
                </IconButton>
              </Box>
              <Box className="filterIcon">
                <IconButton>
                  <IoEyeSharp />
                </IconButton>
              </Box>
              <Box className="filterIcon">
                <IconButton>
                  <AiOutlineInfoCircle />
                </IconButton>
              </Box>
            </Box>
            <Box ml={2}>
              <Button
                variant="contained"
                color="secondary"
                className="sortButton"
              >
                <MdSwapVert style={{ fontSize: "22px" }} /> Sort
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </ProfileBox>
  );
}

RecentDocumentFilter.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
