import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiRouterCall } from "@/apiConfig/service";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { isValidEmail } from "@/utils";
import { FiArrowUpRight } from "react-icons/fi";
const SubscribeSection = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: "0 25px",
  "& .imgPosition": {
    position: "absolute",
    bottom: "-15px",
    width: "45%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function SubscribeModal({ open, handleClose }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleFormSubmit = async () => {
    setIsSubmit(true);
    if (!isValidEmail(email)?.issuccess) {
      return;
    }
    setIsSubmit(false);
    try {
      setIsLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        endPoint: "subscribe",
        bodyData: {
          email: email,
        },
      });
      if (response?.data?.responseCode === 200) {
        handleClose();
        toast.success(response?.data?.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
      }
      setEmail("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.responseMessage);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          maxWidth: "669px",
          width: "100%",
          paddingLeft: "0px",
        },
      }}
    >
      <SubscribeSection>
        <DialogContent>
          <Box align="center">
            <img
              src="/images/subscribe_1.svg"
              alt="subscribeImg"
              width="160px"
              height="160px"
              // className="imgPosition"
            />

            <Box mt={4}>
              <Typography
                variant="h2"
                color="primary"
                fontWeight="400"
                fontSize="20px"
                style={{ textAlign: "center" }}
              >
                This website uses cookies
              </Typography>
              <Box align="center">
                <Typography variant="body2" color="secondary" mb={4} mt={1.4}>
                  We use cookies to personalise content and ads, to provide
                  social media features and to analyse our traffic. We also
                  share information about your use of our site with our social
                  media, advertising and analytics partners who may combine it
                  with other information that you’ve provided to them or that
                  they’ve collected from your use of their services.
                </Typography>

                <Box className="displayCenter" style={{ gap: "5px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleClose}
                    style={{ background: "#35284A", color: "#FFFFFFCC" }}
                  >
                    Deny
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleClose}
                    style={{
                      background:
                        "linear-gradient(180deg, #01ED9B 0%, #02BA64 100%)",
                      color: "#FFFFFFCC",
                    }}
                  >
                    Allow All
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </SubscribeSection>
    </Dialog>
  );
}
