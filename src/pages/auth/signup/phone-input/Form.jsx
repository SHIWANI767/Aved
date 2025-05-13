import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useTheme } from "@mui/material/styles";
import i18n from "@/i18n";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { apiRouterCall } from "@/api-services/service";

const ResponsiveImg = styled("img")(({ theme }) => ({
  height: "35px",
  maxWidth: "100%",
  objectFit: "contain",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    height: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "25px",
  },

  [theme.breakpoints.down("xs")]: {
    height: "20px",
  },
}));
const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  "& .form-control": {
    color: "#000",
    borderRadius: "15px",
    height: "50px",
    background: "#F2F2F2 !important",
    border: "1px solid #DFDFDF !important",
    direction: "ltr", // Ensure phone number is always LTR
    textAlign: "left", // Align text properly in RTL mode
    paddingLeft: "45px", // Adjust padding to prevent overlap with flag
  },
  "& .selected-flag": {
    border: "1px solid #DFDFDF !important",
    background: "#F2F2F2 !important",
    direction: "ltr", // Keep the flag and input direction consistent
  },
  "& .selected-flag .arrow": {
    left: "20px",
    right: "unset", // Ensure arrow position is correct in RTL
  },
  "& .flag-dropdown": {
    backgroundColor: "transparent",
    borderRadius: "5px 0 0 5px",
    textAlign: "left",
    direction: "ltr", // Ensure dropdown text remains readable
  },
  "& .country-list .country": {
    padding: "7px 9px",
    textAlign: "left",
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      background: "#681E65 !important",
      color: "#fff",
    },
  },
  "& .country-list .country.highlight": {
    backgroundColor: "#F39200",
  },
  "& .country-list": {
    color: "#000",
  },
}));
export default function Form() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [check, setCheck] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");

  const style = {
    toggleBotton: {
      display: "flex",
      flexDirection: "row",
      border: "1.5px solid #25826A",
      padding: "5px", // Reduce padding to prevent overflow
      borderRadius: "10px",
      width: "auto",
      alignItems: "center", // Align items vertically
      gap: "8px", // Add gap between buttons
      flexWrap: "nowrap", // Prevent items from wrapping
      background: "#25826a0f",
    },
    singleBotton: {
      padding: " 8px 25px 8px 25px", // Adjust padding for proper spacing
      cursor: "pointer",
      borderRadius: "10px",
      whiteSpace: "nowrap", // Prevent text from wrapping
    },
    currentLang: {
      color: "white !important",
      backgroundColor: (theme) => theme.palette.custom.main,
    },
    dontHaveAccount: {
      color: "#25826A",
      fontWeight: "bold",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const router = useRouter();

  const handleChange = (selectedLanguage) => {
    console.log(i18n.language, selectedLanguage);
    console.log(i18n.isInitialized, "kdkd");
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setCurrentLang(selectedLanguage); // Trigger re-render
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required(t("valid_phone_number_required"))
        .test("is-valid-phone", t("invalid_phone_number"), function (value) {
          console.log(value, selectedCountry);
          if (typeof value !== "string") return false;
          const phoneNumber = parsePhoneNumberFromString(
            value,
            selectedCountry
          );
          return phoneNumber ? phoneNumber.isValid() : false;
        })
        .test(
          "is-not-all-zeros",
          t("phone_number_all_zeros"),
          function (value) {
            if (!value) return false;
            const phoneNumber = parsePhoneNumberFromString(
              value,
              selectedCountry
            );
            if (!phoneNumber) return false;
            const nationalNumber = phoneNumber.nationalNumber; // Get only the national number
            return !/^[0]+$/.test(nationalNumber); // Check if the national number is all zeros
          }
        ),
    }),

    onSubmit: async (values) => {
      console.log("Thish is my pohone", values.phoneNumber);
      const phoneNumber = parsePhoneNumberFromString(values.phoneNumber);
      if (!phoneNumber) {
        console.error("Invalid phone number");
        return;
      }
      const countryCode = `+${phoneNumber.countryCallingCode}`; // Extract country code
      const mobileNumber = phoneNumber.nationalNumber; // Extract national number
      const _id = localStorage.getItem("user_id");
      setLoading(true);
      try {
        const response = await apiRouterCall({
          method: "PUT",
          endPoint: "addMobileNumber",
          bodyData: {
            _id: _id,
            countryCode: countryCode,
            mobileNumber: mobileNumber,
          },
        });
        if (response?.data?.responseCode === 200) {
          toast.success(response?.data?.responseMessage);
          router.push({
            pathname: "/auth/signup/phone-otp-verify",
            query: {
              phoneNumber: values.phoneNumber,
              mobileNumber: mobileNumber,
            },
          });
          console.log("Number added successfully", response);
        } else {
          toast.error(response?.data?.responseMessage);
          console.log("This is the error in api", response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Form Submitted", values);
        setLoading(false);
      }
    },
  });
  return (
    <Container maxWidth="lg" sx={{ padding: "4% 1% 0 1% " }}>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6} alignContent={"center"}>
          {" "}
          <ResponsiveImg
            src="/images/Login/logo.png"
            alt="Logo"
            onClick={() => router.push("/")}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box sx={style.toggleBotton}>
            <Box
              sx={{
                ...style.singleBotton,
                ...(currentLang === "en" ? style.currentLang : {}),
              }}
              onClick={() => handleChange("en")}
            >
              <Typography variant="body1">English</Typography>
            </Box>

            <Box
              sx={{
                ...style.singleBotton,
                ...(currentLang === "ar" ? style.currentLang : {}),
              }}
              onClick={() => handleChange("ar")}
            >
              <Typography variant="body1">اوربی</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider
        sx={{
          backgroundColor: "#0000001A",
          marginTop: 4,
        }}
      />
      <Box mt={2}>
        <Container maxWidth="sm">
          <Typography variant="title2">{t("enter_phone_number")}</Typography>
          <Typography variant="h6" color="#8f8787">
            {t("enter_phone_number_description")}
          </Typography>
          <br />
          <form onSubmit={formik.handleSubmit} dir="ltr">
            <Box marginBottom={0}>
              <StyledPhoneInput
                country={"in"}
                value={formik.values.phoneNumber}
                error={Boolean(formik.errors.phoneNumber)}
                onChange={(phone, countryData) => {
                  const phoneNumber = parsePhoneNumberFromString(`+${phone}`); // Parse the phone number
                  if (phoneNumber) {
                    const formattedNumber = phoneNumber.formatInternational(); // Format as +91 9630830381
                    formik.setFieldValue(
                      "phoneNumber",
                      `+${phoneNumber.countryCallingCode}-${phoneNumber.nationalNumber}`
                    ); // Set the formatted number
                  } else {
                    formik.setFieldValue("phoneNumber", phone); // Fallback to original value if parsing fails
                  }
                  setSelectedCountry(countryData.countryCode.toUpperCase());
                }}
                onCountryChange={(country) =>
                  setCountryCode(country.countryCode)
                }
                inputStyle={{
                  background: "transparent",
                  width: "100%",
                  height: "47px",
                  color: "#000",
                  border: "1px solid black",
                  borderRadius: "3px",
                  direction: "ltr", // Enforce LTR for proper number formatting
                  textAlign: "left", // Align text correctly
                  paddingLeft: "45px", // Prevent overlap with flag dropdown
                }}
                placeholder={"enter phone"}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <Typography color="#DF3939" variant="body1">
                  {formik.errors.phoneNumber}
                </Typography>
              )}
            </Box>
            <Box mt={4}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? t("loading") : t("next")}
                </Button>
              </Box>
              <Divider sx={{ color: "#8f8787", mt: 2 }}>{t("or")}</Divider>
              <Typography variant="h6" textAlign={"center"} mt={2}>
                {t("ask_me_later")}&nbsp;
                <span
                  style={style.dontHaveAccount}
                  onClick={() => router.push("/auth/login")}
                >
                  {t("skip")}
                </span>
              </Typography>
            </Box>
            <br />
            {/* <Typography variant="h6" textAlign={"center"}>
              ← Back to{" "}
              <span
                style={style.dontHaveAccount}
                onClick={() => router.push("/auth/login")}
              >
                Login
              </span>
            </Typography> */}
          </form>
        </Container>
      </Box>
    </Container>
  );
}
