// components/Modal.js
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

const ReadProfileBox = styled(Box)(({ theme }) => ({}));

export default function NotificationModal({ open, handleClose }) {
  return (
    <ReadProfileBox>
      <Box className="chatdialogBox">
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="xs"
          style={{}}
        >
          <Box>
            <IconButton className="chatopButton" onClick={handleClose}>
              <AiOutlineMinus />
            </IconButton>
            <IconButton className="chatopButton" style={{ right: "60px" }}>
              <BsThreeDots />
            </IconButton>
          </Box>
          <Box className="chatscrollBox">
            <DialogTitle
              className="chatdialogBox"
              style={{
                padding: "0px",
                lineHeight: "normal",
                background: "linear-gradient(90deg, #7a69fe 0%, #3d50ff 100%) ",
                borderRadius: "20px 20px 0px 0px",
              }}
            >
              <Box
                align="center"
                className="chatcontentmainBox displayStart"
                style={{ alignItems: "flex-start", padding: "16px 0 0px 10px" }}
              >
                <Avatar
                  className="chatcontentBox"
                  src="/images/chat_icon.png"
                ></Avatar>

                <Box ml={2}>
                  <Typography variant="h6" style={{ color: "#fff" }}>
                    Chat Assistant
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ color: "#F00", textAlign: "left" }}
                  >
                    ALERT
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent className="gradientTextborder">
              <Box className="gradientbackground ">
                <Box align="center" mt={2} mb={3}>
                  <Typography variant="body1">Today, 04:20</Typography>
                </Box>
                <Box className="msg">
                  <Box className="msg left-msg">
                    <Box className="profilechatImg displayCenter">
                      <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/chatprofile.svg" alt="images" />
                    </Box>

                    <Box className="msg-bubble">
                      <Typography variant="body1">Hi There,</Typography>
                      <Typography variant="body1">
                        How can I help you today?
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box mt={2} mb={4} className="displayWrap">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="chatButton"
                    style={{ textTransform: "capitalize" }}
                  >
                    Care Plans
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    color="primary"
                    className="chatButton"
                    style={{ textTransform: "capitalize" }}
                  >
                    Medication
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="chatButton"
                    style={{ textTransform: "capitalize" }}
                  >
                    Reports
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="chatButton"
                    style={{ textTransform: "capitalize" }}
                  >
                    Write Emails
                  </Button>
                </Box>

                <Box className="msg right-msg">
                  <Box className="msg-bubble">
                    <Typography variant="body1">Features</Typography>
                  </Box>
                </Box>

                <Box className="msg">
                  <Box className="msg left-msg">
                    <Box>
                      <Box className="profilechatImg displayCenter">
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/chatprofile.svg" alt="images" />
                      </Box>
                    </Box>

                    <Box className="msg-bubble">
                      <Typography variant="body1">
                        If you would like more information on any of my
                        features. Either type or say the feature number or ask
                        me a question
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box align="center">
                  <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="images/music.png" alt="images" />
                </Box>

                <Box className="msg" mt={2}>
                  <Box className="msg left-msg">
                    <Box className="profilechatImg displayCenter">
                      <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/chatprofile.svg" alt="images" />
                    </Box>

                    <Box className="msg-bubble">
                      <Box className="displayStart">
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
                          src="images/record.png"
                          alt="images"
                          style={{ marginRight: "10px" }}
                        />
                        <Typography variant="body1">
                          Creating Report...
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Box>

          <Box className="displaySpacebetween bottomTextfeild">
            <TextField
              variant="standard"
              placeholder="Type and pless [enter]"
              fullWidth
            />
            <IconButton className="chatIconBox">
              <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/voice.svg" alt="voice" />
            </IconButton>
            <IconButton style={{ background: "transparent" }}>
              <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/chatarrow.svg" alt="voice" />
            </IconButton>
            <IconButton style={{ background: "#E9E7E9" }}>
              <RiSendPlane2Fill
                style={{ color: "#7a69fe", fontSize: "29px" }}
              />
            </IconButton>
          </Box>
        </Dialog>
      </Box>
    </ReadProfileBox>
  );
}
