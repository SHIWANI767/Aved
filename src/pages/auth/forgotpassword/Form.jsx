import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/layout/AuthLayout";
import toast from "react-hot-toast";
import { apiRouterCall } from "@/api-services/service";

export default function Form() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
          t("errors.invalid_email")
        )
        .required(t("errors.required_email")),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await apiRouterCall({
          method: "PUT",
          endPoint: "forgotPassword",
          bodyData: { email: values.email },
        });

        if (response?.data?.responseCode === 200) {
          localStorage.setItem("user_id", response?.data?.result?._id);
          const newExpiration = Math.floor(Date.now() / 1000) + 180;
          localStorage.setItem("otp_expiration", newExpiration);
          toast.success(response?.data?.responseMessage);
          router.push({
            pathname: "/auth/forgotpassword/optverification",
            query: { email: values.email },
          });
        } else {
          toast.error(response?.data?.responseMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box mt={10}>
      <Container maxWidth="sm">
        <Typography variant="title2">{t("forgot_password")}</Typography>
        <Typography variant="h6" color="#8f8787">
          {t("forgot_password_description")}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6">{t("email")}</Typography>
            <InputBox
              type="text"
              name="email"
              placeholder="example@gmail.com"
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
          <Box mt={4} display="flex" justifyContent="center">
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              {loading ? "Loading..." : t("submit")}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

Form.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
