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
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Openingwebsite = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ padding: "20px 20px 0px 20px" }}>
        <Typography
          variant="h5"
          style={{
            borderBottom: "1px solid rgba(22, 30, 41, 0.40)",
            paddingBottom: "13px",
          }}
        >
          Opening a link to a website
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        className="iconTransparent"
        onClick={handleClose}
        sx={{
          background: "transparent",
          color: "gray",
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={{ padding: "20px" }}>
        <Box>
          <Typography variant="body2">
            Do you want to create a new care plane or upload.
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content.
          </Typography>
        </Box>

        <Box mt={2} className="displayStart">
          <Checkbox {...label} style={{ color: "#7A69FE" }} />
          <Typography variant="body2">
            Don’t show me this message again
          </Typography>
        </Box>

        <Box mt={4} mb={4} className="displayStart">
          <Button
            variant="outlined"
            color="primary"
            className="createvariantButton1"
            style={{ textTransform: "capitalize" }}
          >
            Stay on MVP Care
          </Button>{" "}
          &nbsp; &nbsp; &nbsp;
          <Button
            variant="contained"
            color="primary"
            className="createvariantButton1"
          >
            Open PDF
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Openingwebsite;
