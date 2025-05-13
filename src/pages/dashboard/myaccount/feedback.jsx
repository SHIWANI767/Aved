import { useState } from "react";
import { Box, Button, Typography, Grid, Chip, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DashboardLayout from "../layout";
import InputBox from "@/components/InputBoxes/InputBox";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const feedbackOptions = [
  "clarity_of_returns",
  "transparency",
  "investment_quality",
  "investment_options",
  "rental_income",
  "timeliness_security",
  "ease_of_onboarding",
  "customer_experience",
  "customer_support",
  "withdrawal_liquidity",
  "funding_payment_methods",
];

const BoxContainer = styled(Box)(({ theme }) => ({
  marginTop: "28px",
  "& .chipBox .MuiChip-root": {
    borderRadius: "16px",
    border: "1px solid rgb(37,130,106)",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "rgb(37,130,106)",
      color: "#fff !important",
    },
  },
  "& .chipBox .selected": {
    backgroundColor: "rgb(37,130,106)",
    color: "#fff !important",
  },
  "& .inputFieldBox": {
    backgroundColor: "#25826a0f",
    padding: "14px 14px !important",
    width: "94%",
    height: "80%",
    overflow: "auto",
    border: "1px solid #E2E8F0",
    color: "#100e12",
    borderRadius: "8px",
  },
  "& .mainBox": {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    padding: "4%",
  },
  "& .emojiStyle": {
    fontSize: "44px",
    cursor: "pointer",
    transition: "all 0.3s",
    "&.selected": {
      transform: "scale(1.2)",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "36px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },
}));

export default function Feedback() {
  const [rating, setRating] = useState(null);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const emojiMap = ["😡", "🙁", "😐", "😊", "🤩"];
  const [selectedOptions, setSelectedOptions] = useState("");
  const { t } = useTranslation();

  const handleOptionClick = (option) => {
    let selectedArray = selectedOptions ? selectedOptions.split(", ") : [];

    if (selectedArray.includes(option)) {
      selectedArray = selectedArray.filter((o) => o !== option);
    } else {
      selectedArray.push(option);
    }

    setSelectedOptions(selectedArray.join(", "));
  };

  const submitFeedback = async () => {
    if (!rating) {
      console.log("Please select a rating.");
      return;
    }

    const feedbackTypes = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

    try {
      setLoading(true);
      const response = await apiRouterCall({
        method: "POST",
        endPoint: "addFeedback",
        token: user?.userInfo?.token,
        bodyData: {
          customerName: user?.userInfo?.fullName,
          feedbackType: feedbackTypes[rating - 1],
          improvement: selectedOptions, // Now a comma-separated string
          feedback: feedbackText,
        },
      });

      if (response?.data?.responseCode === 200) {
        console.log("Feedback submitted successfully:", response);
        toast.success(response?.data?.responseMessage);

        // ✅ Reset all fields after submission
        setRating(null);
        setSelectedOptions("");
        setFeedbackText("");
      } else {
        toast.error(response?.data?.responseMessage);
      }
    } catch (error) {
      console.log("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <BoxContainer>
        <Box className="mainBox">
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FeedbackIcon sx={{ marginRight: "8px", fontSize: "25px" }} />
            <Typography variant="h3">{t("feedback")}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "5px",
              mt: "8px",
            }}
          >
            <Typography variant="h5" color="primary">
              {t("we_value_your_feedback")}
            </Typography>
            <Typography variant="body3" color="primary">
              {t("feedback_description")}
            </Typography>
          </Box>

          {/* Rating Section */}
          <Box
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              p: 2,
              mb: "24px",
              mt: "18px",
            }}
          >
            <Typography variant="h4" color="primary">
              {t("rate_us")}
            </Typography>
            <Grid container spacing={1} my={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "13px",
                }}
              >
                {emojiMap.map((emoji, index) => (
                  <span
                    key={index}
                    className={`emojiStyle ${
                      rating === index + 1 ? "selected" : ""
                    }`}
                    onClick={() => setRating(index + 1)}
                  >
                    {emoji}
                  </span>
                ))}
              </Box>
            </Grid>
          </Box>

          {/* Improvement Options */}
          <Box
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              p: 2,
              mb: "24px",
            }}
          >
            <Typography variant="h4" gutterBottom marginBottom="17px">
              {t("tell_us_what_can_be_improved")}
            </Typography>
            <Grid container spacing={1} mb={2}>
              {feedbackOptions.map((option) => (
                <Grid item key={option}>
                  <Box className="chipBox">
                    <Chip
                      variant="outlined"
                      clickable
                      onClick={() => handleOptionClick(option)}
                      label={t(option)}
                      className={
                        selectedOptions.includes(option) ? "selected" : ""
                      }
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Feedback Input Box */}
          <Box mb={2}>
            <InputBox
              type="text"
              name="description"
              placeholder={t("any_suggestions")}
              className="inputFieldBox"
              multiline={true}
              rows={6}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              maxLength={500}
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            disabled={loading}
            fullWidth
            onClick={submitFeedback}
            disabled={!feedbackText || !selectedOptions || !rating}
          >
            {loading ? t("loading") : t("submit")}
          </Button>
        </Box>
      </BoxContainer>
    </Container>
  );
}

Feedback.getLayout = function Feedback(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
