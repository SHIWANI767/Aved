import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useRouter } from "next/router";

const KycModal = ({ open, handleClose }) => {
  const router = useRouter()
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: 4, top: 4 }}
      >
        <CloseIcon style={{ color: "#000" }} />
      </IconButton>

      {/* Title Section */}
      <DialogTitle>
        <Box display="flex" justifyContent="center" alignItems="center">
          <VerifiedUserIcon sx={{ fontSize: 40, color: "#25826A", mr: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            Complete Your KYC Verification
          </Typography>
        </Box>
      </DialogTitle>

      {/* Content Section */}
      <DialogContent sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box width="100%" maxWidth="600px" sx={{   borderTop: "1px solid #E2E8F0",
          paddingTop: "18px"}}>
          <Typography variant="h5" color="primary"  textAlign="center">
            To comply with regulations and ensure security, please upload a copy
            of your <b>Passport</b> and <b>Proof of Residence</b>.
          </Typography>
        </Box>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ justifyContent: "center", pb: 2, pt:3 }}>
        <Button variant="contained" color="primary" onClick={() => router.push("/auth/employment-details")}>
          Complete KYC
        </Button>
        <Button variant="outlined" color='primary' onClick={handleClose}>
          Complete Later
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KycModal;
