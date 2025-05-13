import React, { useState, useEffect, useMemo } from "react";
import { Typography, Box, Button } from "@mui/material";
import moment from "moment";
import { calculateTimeLeft } from "@/utils";
import { apiRouterCall } from "@/api-services/service";
import { toast } from "react-hot-toast";
import { ApiConfig } from "@/api-services";
import styled from "@emotion/styled";

const TimerComponent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  "@media(max-width:767px)": {
    // marginRight: "12px",
  },
}));

export default function Timer({ email, setOTP }) {
  const [endTime, setEndTime] = useState(moment().add(3, "m").unix());
  const [timeStamp, setTimeStamp] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeStamp(calculateTimeLeft(endTime * 1000));
        const timeLefts = calculateTimeLeft(endTime * 1000);
        sessionStorage.setItem("otpTimer", JSON.stringify(timeLefts));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleResendOtpSubmit = async () => {
    try {
      setIsUpdating(true);
      const bodyData = {
        email: email,
      };
      setOTP("");
      const response = await apiRouterCall({
        method: "POST",
        url: ApiConfig.resendOTPU,
        bodyData: bodyData,
      });
      if (response?.data?.responseCode == 200) {
        sessionStorage.removeItem("otpTimer");
        setEndTime(moment().add(3, "m").unix());
        toast.success(response.data.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      isUpdating;
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  const timeLeft = useMemo(() => {
    if (sessionStorage.getItem("otpTimer")) {
      const storedTimer = sessionStorage.getItem("otpTimer");
      const parsedTimer = JSON.parse(storedTimer);
      !timeStamp &&
        setEndTime(
          moment()
            .add(parsedTimer?.minutes, "m")
            .add(parsedTimer?.seconds, "s")
            .unix()
        );
      return parsedTimer;
    }
  }, [sessionStorage.getItem("otpTimer")]);

  return (
    <TimerComponent>
      <Typography color="primary" variant="h6">
        2:35
      </Typography>
      <Typography color="primary" variant="h6">
        Resend OTP
      </Typography>
      {/* {timeLeft && timeLeft.seconds >= 0 ? (
        <Typography
          variant="body2"
          style={{ color: "#eb1414", display: "flex", flexDirection: "row" }}
        >
          <Box style={{ width: "22px" }}>
            {timeLeft?.minutes.toString().padStart(2, "0")}
          </Box>{" "}
          m :{" "}
          <Box style={{ width: "22px" }}>
            {timeLeft?.seconds.toString().padStart(2, "0")}
          </Box>{" "}
          s
        </Typography>
      ) : (
        <Typography
          variant="body2"
          onClick={() => {
            if (!isUpdating) {
              handleResendOtpSubmit();
            }
          }}
          style={{ cursor: "pointer", fontSize: "13px" }}
        >
          {isUpdating ? "Sending..." : "Resend"}
        </Typography>
      )} */}
    </TimerComponent>
  );
}
