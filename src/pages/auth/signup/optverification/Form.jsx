import { Box, Button, Container, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";

const MainComponent = styled('div')({
  '& .myTimer': {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "58%", '@media(max-width: 1024px)': {
      width: "75%"
    }, '@media(max-width:900px)': {
      width: '58%'
    }, '@media(max-width:560px)': {
      width: '65%'
    }, '@media(max-width:490px)': {
      width: '83%',
    }, '@media(max-width: 390px)': {
      width: '100%'
    }
  }
})

export default function Form() {
  const router = useRouter();
  const { email } = router.query;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const getRemainingTime = () => {
    const savedExpiration = localStorage.getItem("otp_expiration");
    if (!savedExpiration) return 0;
    const expirationTime = parseInt(savedExpiration, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(expirationTime - currentTime, 0);
  };

  useEffect(() => {
    const remainingTime = getRemainingTime();
    setTimeLeft(remainingTime);
    if (remainingTime > 0) {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(newIntervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
      return () => clearInterval(newIntervalId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRouterCall({
        method: "POST",
        endPoint: "verifyEmailForSignup",
        bodyData: { email, otp },
      });
      if(res.data.responseCode === 200){
        toast.success(res.data.responseMessage)
        router.push('/auth/signup/set-password')
        console.log("otp verified", res)
      }
      else{
        toast.error(res.data.responseMessage)
        console.log("otp error", res)
      }
      console.log("OTP Verification Response:", res);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading || timeLeft > 0) return;
    setResendLoading(true);
    try {
      await apiRouterCall({
        method: "PUT",
        endPoint: "resendOtp",
        bodyData: { email },
      });
      console.log("Resend OTP Success");
      const newExpiration = Math.floor(Date.now() / 1000) + 180;
      localStorage.setItem("otp_expiration", newExpiration);
      setTimeLeft(180);
      if (intervalId) clearInterval(intervalId);
      const newIntervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(newIntervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(newIntervalId);
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <MainComponent >
      <Container maxWidth="sm">
        <Box className='displayColumn'>
          <img src="/images/Login/email.png" alt="Email Verification" />
          <Typography variant="title2">OTP Verification</Typography>
        </Box>
        <Typography variant="h6" color="#8f8787" textAlign='center'>
          Check your <strong>{email || "your email"}</strong> for the
          verification code.
        </Typography>
        <form onSubmit={handleSubmit} alignContent='center'>
          <Box mt={2} sx={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              inputStyle={{
                width: "60px",
                height: "60px",
                margin: "0 8px",
                fontSize: "20px",
                borderRadius: "8px",
                border: "1px solid #25826A",
                textAlign: "center",
              }}
            />

            <Box
              mt={2}
              className='myTimer'
            >
              {timeLeft > 0 && (
                <Typography variant="body6" fontWeight={400}>
                  {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                    .toString()
                    .padStart(1, "0")}`}
                </Typography>
              )}
              <Typography
                variant="body6"
                sx={{
                  cursor: timeLeft === 0 && !resendLoading ? "pointer" : "not-allowed",
                  color: timeLeft === 0 ? "#25826a" : "black",
                  fontWeight: "bold",
                  opacity: resendLoading ? 0.5 : 1,
                }}
                onClick={handleResendOtp}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </Typography>
            </Box>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%" }}
              disabled={loading || otp.length !== 4}
            >
              {loading ? "Verifying..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Container>
    </MainComponent>
  );
}
