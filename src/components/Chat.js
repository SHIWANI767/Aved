import {
  Typography,
  Box,
  Button,
  Paper,
  FormControl,
  Grid,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import { RiArrowDropDownLine } from "react-icons/ri";
const MainDocumentBox = styled("Box")(({ theme }) => ({
  "& .chatinformationBox": {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
      width: "223px",
    },
  },
  "& .paperchatBox": {
    padding: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  "& .documentViewBox": {
    "& h2": {
      color: "#161E29",
    },
    "& .perpalBox": {
      backgroundColor: "#7A69FE",
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      [theme.breakpoints.down("sm")]: {
        width: "60px",
        height: "60px",
      },
    },
    "& .profile": {
      position: "relative",
      "& h4": {
        color: "#161E29",
        fontWeight: "500",
      },
      "& .whiteBox": {
        backgroundColor: "#FFFFFF",
        borderRadius: "50%",
        width: "76px",
        height: "76px",
        "& img": {
          borderRadius: "50%",
          objectFit: "cover",
          width: "auto",
          maxWidth: "100%",
        },
      },
      "& .greenBox": {
        backgroundColor: "#00FF38",
        borderRadius: "50%",
        width: "15px",
        height: "15px",
        position: "absolute",
        zIndex: 1,
        top: "5px",
        left: "60px",
      },
    },

    "& .manage-responsive": {
      "& svg": {
        color: "#fff",
      },
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        "& button": {
          marginTop: "8px",
        },
      },
    },
    "& .folderBox": {
      marginLeft: "40px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0px",
      },
    },
    "& .leftChaatBox": {
      marginTop: "40px",
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderRadius: "20px 20px 20px 0px",
      padding: "25px",
      maxWidth: "700px",
      "& p": {
        color: "rgba(22, 30, 41, 0.87)",
        fontWeight: "200",
        lineHeight: "182%",
      },
    },
    "& .leftProfileBox": {
      marginTop: "16px",
      "& p": {
        color: "var(--style, rgba(22, 30, 41, 0.60))",
        lineHeight: "146.5%",
        marginLeft: "16px",
      },
    },
    "& .rightChaatBox": {
      marginTop: "40px",
      backgroundColor: "#7A69FE",

      borderRadius: "20px 20px 0px 20px",
      padding: "25px",
      maxWidth: "700px",
      "& p": {
        color: "#FFF",
        fontWeight: "200",
        lineHeight: "182%",
      },
    },
    "& .rightProfileBox": {
      marginTop: "16px",
      "& p": {
        color: "var(--style, rgba(22, 30, 41, 0.60))",
        lineHeight: "146.5%",
        marginLeft: "16px",
        marginRight: "16px",
      },
    },
    "& .sentMessageBox": {
      marginTop: "40px",
      "& .css-gaffrz-MuiButtonBase-root-MuiIconButton-root": {
        width: "28px",
        height: "28px",
        marginBottom: "35px",
      },
      "& .sendButton": {
        marginLeft: "8px",
        "& .css-gaffrz-MuiButtonBase-root-MuiIconButton-root": {
          backgroundColor: "transparent !important",
        },
      },
    },
    "& .dropDownBox": {
      margin: "10px 0px 60px",
      "& p": {
        marginBottom: "8px",
        color: "rgba(0, 0, 0, 0.87)",
        fontWeight: "200",
        lineHeight: "26px",
      },
    },
  },
}));
const selectoption = [{ title: "Male" }, { title: "Female" }];

const selectoption1 = [{ title: "English" }, { title: "Hindi" }];
export default function index() {
  const router = useRouter();
  return (
    <Box className="mainChatBox">
      <MainDocumentBox>
        <Box className="documentViewBox">
          <Typography variant="h2">Ask About Document</Typography>
          <Paper elevation={1} mt={3} className="paperchatBox">
            <Box className="displaySpacebetween manage-responsive">
              <Box>
                <Box className={`perpalBox displayCenter`}>
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src="/images/chaticon.svg"
                    alt="chatimg"
                    width="35px"
                  />
                </Box>
              </Box>

              <Box ml={2} className="chatinformationBox">
                <Typography variant="body2">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English
                </Typography>
              </Box>

              <Box className="folderBox">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    router.push("/document/ask-question");
                  }}
                >
                  Back To Folders
                </Button>
              </Box>
            </Box>
          </Paper>
          <Box className="dropDownBox">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ width: "100%", position: "relative" }} mt={1}>
                  <RiArrowDropDownLine className="dopicon" />
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    options={selectoption.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Document To Talk About"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box style={{ width: "100%", position: "relative" }} mt={1}>
                  <RiArrowDropDownLine className="dopicon" />
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    options={selectoption1.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Care To Talk Aboutt"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className={`profile displayStart`}>
            <Box className={`perpalBox displayCenter`}>
              <Box className={`whiteBox displayCenter`}>
                <img
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src="/images/profileImage.jpg"
                  alt="profile"
                />
              </Box>
            </Box>
            <Box style={{ marginLeft: "16px" }}>
              <Typography variant="h5">Maria Jain</Typography>
              <Typography variant="body2">Online</Typography>
            </Box>
            <Box className="greenBox"></Box>
          </Box>
          <Box>
            <Divider
              sx={{
                backgroundColor: "rgba(22, 30, 41, 0.60)",
                marginTop: "30px",
              }}
            />
          </Box>
          <Box className="leftChaatBox">
            <Typography variant="body1">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters
            </Typography>
          </Box>
          <Box className={`leftProfileBox displayStart`}>
            <Avatar src="/images/profileImage.jpg" />
            <Typography
              variant="body2"
              style={{
                color: "rgba(22, 30, 41, 0.87)",
                lineHeight: "146.5%",
                marginLeft: "16px",
              }}
            >
              Maria Jain
            </Typography>
            <Typography variant="body2">8:24 PM &nbsp;08/07/2023</Typography>
          </Box>

          <Box className="displayEnd">
            <Box className="rightChaatBox">
              <Typography variant="body1">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters
              </Typography>
            </Box>
          </Box>
          <Box className="displayEnd">
            <Box className={`rightProfileBox displayStart`}>
              <Typography
                variant="body2"
                style={{
                  color: "rgba(22, 30, 41, 0.87)",
                  lineHeight: "146.5%",
                  marginLeft: "16px",
                }}
              >
                Maria Jain
              </Typography>
              <Typography variant="body2">8:24 PM &nbsp;08/07/2023</Typography>
              <Avatar src="/images/profileImage.jpg" />
            </Box>
          </Box>

          <Box className="leftChaatBox">
            <Typography variant="body1">
              It is a long established fact that a reader will be distracted by
              the readable
            </Typography>
          </Box>
          <Box className={`leftProfileBox displayStart`}>
            <Avatar src="/images/profileImage.jpg" />
            <Typography
              variant="body2"
              style={{
                color: "rgba(22, 30, 41, 0.87)",
                lineHeight: "146.5%",
                marginLeft: "16px",
              }}
            >
              Maria Jain
            </Typography>
            <Typography variant="body2">8:24 PM &nbsp;08/07/2023</Typography>
          </Box>
          <Box className="sentMessageBox">
            <Typography variant="body2">Sent Message...</Typography>
            <FormControl fullWidth>
              <TextField
                id="standard-basic"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <QuestionMarkIcon sx={{ color: "#fff" }} />
                      </IconButton>
                      <Box className="sendButton">
                        <IconButton>
                          <SendIcon
                            sx={{ color: "#7A69FE", fontSize: "30px" }}
                          />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </MainDocumentBox>
    </Box>
  );
}
