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
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useTheme } from "@mui/material/styles";
import i18n from "@/i18n";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { apiRouterCall } from "@/api-services/service";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import parsePhoneNumberFromString, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  "& .form-control": {
    color: "#000",
    borderRadius: "15px",
    height: "50px",
    background: "#F2F2F2 !important",
    border: "1px solid #DFDFDF !important",
  },
  "& .selected-flag:hover, .selected-flag:focus": {
    backgroundColor: "transparent !important",
  },
  "& .selected-flag": {
    border: "1px solid #DFDFDF !important",
    // borderRadius: "10px",
    background: "#F2F2F2 !important",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  "& .selected-flag .arrow": {
    left: "20px",
  },
  "& .flag-dropdown": {
    backgroundColor: "transparent",
    // border: "1px solid #383232",
    borderRadius: "5px 0 0 5px",
  },
  "& .flag-dropdown.open .selected-flag": {
    background: "#1C1C1C",
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
  const { i18n, t } = useTranslation();
  const [check, setCheck] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      name: "",
      email: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t("errors.name_min_length"))
        .required(t("errors.required_name")),

      email: Yup.string()
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
          t("errors.invalid_email")
        )
        .required(t("errors.required_email")),

      description: Yup.string()
        .min(10, t("Description should be at least 10 characters"))
        .required(t("Description is required")),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      console.log("hhhhhhfdg token", user?.userInfo?.token); // Log to verify token availability
      try {
        const response = await apiRouterCall({
          method: "POST",
          endPoint: "contactUs",
          token: user?.userInfo?.token,
          bodyData: {
            name: values.name,
            email: values.email,
            message: values.description,
          },
        });
        console.log(response);
        if (response?.data?.data) {
          toast.success(response?.data?.message);
          router.push("/");
          console.log("API hit successfully", response);
        } else {
          toast.error(response?.data?.message);
          console.log("this is the error in the API==>", response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Contact Us Form Submitted", values);
        setLoading(false);
      }
    },
  });
  return (
    <Box
      sx={{
        width: "100%",
        height: "85vh",
        overflowX: "auto", // Enable horizontal scrolling
        whiteSpace: "nowrap", // Prevent line breaks
        scrollbarWidth: "thin", // Firefox
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="title2">Contact Us</Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6"> {t("signup_section.name")}</Typography>
            <InputBox
              type="text"
              name="name"
              placeholder={t("signup_section.name_placeholder")}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              placeholderColor="#333"
            />
            {formik.touched.name && formik.errors.name && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.name}
              </Typography>
            )}
          </Box>
          <Box mt={1}>
            <Typography variant="h6"> {t("signup_section.email")}</Typography>
            <InputBox
              type="text"
              name="email"
              placeholder={t("signup_section.email_placeholder")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              placeholderColor="#333"
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.email}
              </Typography>
            )}
          </Box>

          {/* <Box mt={1}>
            <Typography variant="h6">Phone</Typography>
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
                // setSelectedCountry(countryData.countryCode.toUpperCase());
              }}
              onCountryChange={(country) => setCountryCode(country.countryCode)}
              inputStyle={{
                background: "transparent",
                width: "100%",
                height: "47px",
                color: "#000",
                border: "1px solid black",
                borderRadius: "3px",
              }}
              placeholder={"enter phone"}
            />
          </Box> */}
          <Box mt={1}>
            <Typography variant="h6"> Description</Typography>
            <InputBox
              type="text"
              name="description"
              placeholder={"Describe"}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && !!formik.errors.description}
              placeholderColor="#333"
              multiline={true}
              rows={6}
            />
            {formik.touched.description && formik.errors.description && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.description}
              </Typography>
            )}
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ width: "100%" }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
