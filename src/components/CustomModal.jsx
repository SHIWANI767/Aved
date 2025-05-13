import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/router";

const CustomModal = ({ open, onClose, title, description, actions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 5 }}
      >
        <CloseIcon style={{ color: "#000" }} />
      </IconButton>

      {/* Title */}
      <DialogTitle>
        <Typography variant="h4" color="primary" textAlign="center">
          {title}
        </Typography>
      </DialogTitle>

      {/* Description */}
      <DialogContent
        sx={{
          textAlign: "center",
          mb: 2,
          borderTop: "1px solid #E2E8F0",
          paddingTop: "12px",
          maxWidth: "450px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="primary" mt={2}>
          {description}
        </Typography>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
        {actions.map((action, index) => (
          <Button key={index} {...action.props}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
