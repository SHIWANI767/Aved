import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
  TextField,
  DialogTitle,
  DialogActions,
  Input,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import styled from "@emotion/styled";
import OTPInput from "react-otp-input";
import ButtonCircularProgress from "./ButtonCircularProgress";

const MainBox = styled("Box")(({ theme }) => ({
  "& .MuiPaper-root-MuiDialog-paper": {
    maxWidth: "550px",
  },
}));
const MainBoxInput = styled("Box")(({ theme }) => ({
  // .css-vxc8qo-MuiInputBase-root-MuiInput-root
  "& .MuiInputBase-root": {
    fontWeight: "300",
    fontSize: "12px",
    fontFamily: "'Open Sans', sans-serif",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    color: "#fff",
    boxSizing: "border-box",
    position: "relative",
    cursor: "text",
    display: "inline-flex",
    WebkitAlignItems: "center",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",
    padding: "16.5px 14px",
    width: "100%",
    border: "1px solid #80808014",
    // borderRadius: "5px",
    background: "#1e2720",
    borderBottom: "none !important",
    height: "148px !important",
    borderRadius: "5px !important",
  },
}));
const ReadProfileBox = styled("Box")(({ theme }) => ({
  "& .MuiTypography-root-MuiDialogTitle-root": {
    color: "#fff",
    fontFamily: "Open Sans',sans-serif;",
    texAlign: "center",
    fontSize: "28px",
    paddingBottom: "16px",
    margin: "0px !important",
    padding: "0px !important",
  },
  "& .MuiOutlinedInput": {
    marginTop: "24px",
    height: "142px !important",
    // "& .css-gz0g0y-MuiInputBase-root-MuiOutlinedInput-root": {
    //   borderRadius: "16px !important",
    // },
  },
  "& .displayCenter": {
    "& input": {
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      // height: "55px !important",
      width: "55px !important",
      marginRight: "10px",
      color: "#fff !important",
      background: "#FFFFFF0D",
      [theme.breakpoints.down("sm")]: {
        // height: "40px !important",
        width: "40px !important",
        marginRight: "5px",
      },
    },
  },
  "& .closeIcon": {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  "& .MuiOutlinedInput": {
    marginTop: "24px",
    height: "142px !important",
    // "& .css-gz0g0y-MuiInputBase-root-MuiOutlinedInput-root": {
    //   borderRadius: "16px !important",
    // },
  },
  "& .confirmationDialogBox": {
    "& .titleBox": {
      "& h4": {
        color: "#fff",
        fontFamily: "Open Sans',sans-serif;",
        texAlign: "center",
        margin: "16px 0px",
      },
    },

    "& h6": {
      color: "#fff",
      fontFamily: "Open Sans',sans-serif;",
      texAlign: "center",
      marginTop: "10px",
      fontWeight: "400",
    },
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Light",
      textAlign: "center",
      width: "100%",
      maxWidth: "320px",
      margin: "16px 0px",
    },
  },
  "& .disclaimerBox": {
    background: "rgba(0, 0, 0, 0.08)",
    borderRadius: "10px",
    padding: "10px",
    "& p": {
      color: "rgba(0, 0, 0, 0.60)",
      fontFamily: "Gilroy-Regular",
    },
  },
}));
const OTPVerificationBox = styled("Box")(({ theme }) => ({
  "& input": {
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    height: "55px !important",
    width: "55px !important",
    marginRight: "10px",
    color: "#fff !important",
    background: "#FFFFFF0D",
    [theme.breakpoints.down("sm")]: {
      height: "30px !important",
      width: "30px !important",
      marginRight: "5px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30px !important",
      width: "30px !important",
      marginRight: "5px",
    },
  },
}));
export default function CommonConfirmationDialog({
  isLoading,
  open,
  handleClose,
  handleSubmit,
  heading,
  type,
  title,
  replyMessage,
  setMessage,
}) {
  const [OTP, setOTP] = useState();

  return (
    <MainBox>
      <Dialog
        open={open}
        onClose={() => {
          if (!isLoading) {
            handleClose();
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
        keepMounted
      >
        <ReadProfileBox>
          <DialogTitle
            sx={{ m: 0, padding: 0, fontSize: "30px" }}
            id="customized-dialog-title"
          >
            <IconButton
              onClick={handleClose}
              size="large"
              disabled={isLoading}
              className="closeIconButton"
            >
              <AiOutlineClose />
            </IconButton>
            <Box className="displayCenter">
              <Box display="flex" alignItems="center">
                {title}
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            {type === "reply" ? (
              <MainBoxInput>
                <Box className="confirmationDialogBox displayStart" pb={1}>
                  <Typography variant="body2" mb={2}>
                    {heading}
                  </Typography>
                </Box>
                <Input
                  fullWidth
                  variant="outlined"
                  type="text"
                  multiline
                  // className="textField"
                  rows="6"
                  placeholder="Type something..."
                  value={replyMessage}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </MainBoxInput>
            ) : (
              <Box className="confirmationDialogBox displayColumn" pb={1}>
                <Typography variant="body2" mt={2}>
                  {heading}
                </Typography>
              </Box>
            )}
            {type === "VERIFY" && (
              <Box className="displayCenter" mt={4} mb={1}>
                <OTPVerificationBox>
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    inputType="number"
                    numInputs={6}
                    autoFocus={true}
                    renderInput={(props) => <input {...props} />}
                    secure
                  />
                </OTPVerificationBox>
              </Box>
            )}
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            {/* <Box my={2} className="displaySpacebetween"> */}
            {type !== "VERIFY" && (
              <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                onClick={handleClose}
                small
              >
                NO
              </Button>
            )}
            <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit(OTP);
              }}
              style={{
                marginLeft: "8px",
                color: "#000",
                background: "#00ff9b",
              }}
              small
            >
              {type !== "VERIFY" ? "YES" : "Verify"}
              {isLoading && <ButtonCircularProgress />}
            </Button>
            {/* </Box> */}
          </DialogActions>
        </ReadProfileBox>
      </Dialog>
    </MainBox>
  );
}
