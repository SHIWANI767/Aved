import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import DashboardLayout from "../layout";
import InputBox from "@/components/InputBoxes/InputBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import FileInput from "@/components/InputBoxes/FileInput";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Component styles
const style = {
  box: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    padding: "2%",
    mt: 2,
  },
};
export default function HelpSupport() {
  const { t } = useTranslation(); // i18n translation hook
  const fileInputRef = useRef(null); // Ref to reset the file input
  const [loading, setLoading] = useState(false); // Loading state during form submission
  const [selectedFile, setSelectedFile] = useState(null); // Holds the selected file
  const user = useSelector((state) => state.user); // Get current user info from Redux store

  // Handles file input change
  const handleFileChange = (file) => {
    setSelectedFile(file);
    formik.setFieldValue("image", file); // Update Formik field manually
  };

  // Formik form handler
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t("errors.name_min_length"))
        .matches(/^(?!\d+$).*$/, t("errors.name_no_only_numbers"))
        .required(t("errors.required_name")),
      email: Yup.string()
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
          t("errors.invalid_email")
        )
        .required(t("errors.required_email")),
      description: Yup.string()
        .min(10, t("form_validation.description_min_length"))
        .required(t("form_validation.description_required")),
      image: Yup.mixed().nullable(true).notRequired(), // Optional image file
    }),

    // Handle form submission
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await apiRouterCall({
          method: "POST",
          endPoint: "uploadFile",
          bodyData: formData,
        });
        // Send support request
        const res = await apiRouterCall({
          method: "POST",
          endPoint: "addSupport",
          token: user?.userInfo?.token,
          bodyData: {
            userName: values.name,
            quire: values.description,
            img: response?.data?.result?.url,
            // email: values.email
          },
        });
        // Success toast
        if (res?.data?.responseCode === 200) {
          toast.success(res?.data?.responseMessage);
          formik.resetForm();
          setSelectedFile(null);
          fileInputRef.current?.clearFile();
        } else {
          toast.error(res?.data?.responseMessage);
        }
      } catch (error) {
        console.log("this is my error", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container>
      {/* Page Title */}
      <Typography variant="h3" mt={2}>
        {t("help_support")}
      </Typography>
      <Box sx={style.box}>
        <Typography variant="h5">{t("support.help_heading")}</Typography>
        <Typography variant="body3">
          {t("support.customer_support_message")}
        </Typography>
        {/* Main Form */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {" "}
              <Box mt={2}>
                <Typography variant="h6">
                  {" "}
                  {t("signup_section.name")}
                </Typography>
                <InputBox
                  type="text"
                  name="name"
                  placeholder={t("signup_section.name_placeholder")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && !!formik.errors.name}
                  placeholderColor="#333"
                  maxLength={90}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography color="#DF3939" variant="body1">
                    {formik.errors.name}
                  </Typography>
                )}
              </Box>
              <Box mt={1}>
                <Typography variant="h6">
                  {" "}
                  {t("signup_section.email")}
                </Typography>
                <InputBox
                  type="text"
                  name="email"
                  placeholder={t("signup_section.email_placeholder")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  placeholderColor="#333"
                  maxLength={256}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography color="#DF3939" variant="body1">
                    {formik.errors.email}
                  </Typography>
                )}
              </Box>
              <Box mt={2}>
                <Typography variant="h6">
                  {t("form_labels.description")}
                </Typography>
                <InputBox
                  type="text"
                  name="description"
                  placeholder={t("form_labels.describe")}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description && !!formik.errors.description
                  }
                  placeholderColor="#333"
                  multiline={true}
                  rows={6}
                  maxLength={600}
                />
                {formik.touched.description && formik.errors.description && (
                  <Typography color="#DF3939" variant="body1">
                    {formik.errors.description}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box mt={1}>
                <Typography variant="h6" gutterBottom>
                  {t("form_labels.upload_file")}
                </Typography>
                <FileInput
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <Typography variant="body1" mt={2}>
                    {t("form_labels.selected_file")}: {selectedFile.name}
                  </Typography>
                )}
                {formik.touched.image && formik.errors.image && (
                  <Typography color="#DF3939" variant="body1">
                    {formik.errors.image}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "50%" }}
              disabled={loading}
            >
              {loading ? t("loading") : t("submit")}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

HelpSupport.getLayout = function HelpSupport(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
