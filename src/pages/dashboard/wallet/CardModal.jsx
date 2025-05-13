import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import DropdownInput from "@/components/InputBoxes/DropdownInput";
import countries from "@/components/InputBoxes/country";
import { apiRouterCall } from "@/api-services/service"; // Import API call function
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const cardTypeOptions = [
  { value: "Visa", label: "Visa" },
  { value: "MasterCard", label: "MasterCard" },
  { value: "American Express", label: "American Express" },
  { value: "Discover", label: "Discover" },
];

export default function AddCardModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // State to handle API errors
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      country: "",
      cardType: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required(t("errors.cardNumber.required"))
        .min(16, t("errors.cardNumber.min")),

      cardHolder: Yup.string()
        .matches(/^[A-Za-z\s]+$/, t("errors.cardHolder.invalid"))
        .required(t("errors.cardHolder.required")),

      expiryDate: Yup.string().required(t("errors.expiryDate.required")),

      country: Yup.string().required(t("errors.country.required")),

      cardType: Yup.string().required(t("errors.cardType.required")),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setApiError(""); // Clear previous errors
      try {
        const res = await apiRouterCall({
          method: "POST",
          endPoint: "addCard",
          token: user?.userInfo?.token,
          bodyData: {
            cardNumber: values.cardNumber,
            expiryDate: values.expiryDate,
            cardHolderName: values.cardHolder, // Backend expects cardHolderName
            country: values.country,
            cardType: values.cardType, // Added Card Type
          },
        });

        if (res?.data?.responseCode === 200) {
          console.log("Card Added Successfully:", res.data);
          toast.success(res?.data?.responseMessage);
          formik.resetForm();
          onClose(); // Close modal on success
        } else {
          setApiError(res?.data?.message || t("errors.api.general"));
          toast.error(res?.data?.responseMessage || t("errors.api.general"));
        }
      } catch (error) {
        setApiError(t("errors.api.general"));
        console.error("API Error:", error);
        toast.error(t("errors.api.general"));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { backgroundColor: "#ffffff", boxShadow: 3 } }}
    >
      <DialogTitle>
        <Typography variant="h4">{t("editBank.title2")}</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        {apiError && (
          <Typography color="#DF3939" variant="body1" sx={{ mb: 2 }}>
            {apiError}
          </Typography>
        )}

        <Box mt={2}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {t("editCard.cardNumber")}
          </Typography>
          <InputBox
            type="text"
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
              if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
              const formattedValue = value.match(/.{1,4}/g)?.join("-") || ""; // Add '-' every 4 digits
              formik.setFieldValue("cardNumber", formattedValue);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.cardNumber && !!formik.errors.cardNumber}
            placeholder={t("editCard.cardNumber")}
            maxLength={19} // 16 digits + 3 hyphens = 19 characters
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />

          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.cardNumber}
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {t("editCard.cardHolder")}
          </Typography>
          <InputBox
            type="text"
            name="cardHolder"
            value={formik.values.cardHolder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardHolder && !!formik.errors.cardHolder}
            placeholder={t("editCard.cardHolder")}
            maxLength={50}
          />
          {formik.touched.cardHolder && formik.errors.cardHolder && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.cardHolder}
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {t("editCard.expiryDate")}
          </Typography>
          <InputBox
            type="text"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d]/g, ""); // Remove non-numeric
              if (value.length > 4) value = value.slice(0, 4); // Max 4 digits (MMYY)

              if (value.length >= 3) {
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
              }

              formik.setFieldValue("expiryDate", value);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.expiryDate && !!formik.errors.expiryDate}
            placeholder="MM/YY"
            maxLength={5}
            inputProps={{
              inputMode: "numeric",
            }}
          />

          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.expiryDate}
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {t("editCard.country")}
          </Typography>
          <DropdownInput
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && !!formik.errors.country}
            options={countries.map((country) => ({
              value: country.sortname,
              label: country.name,
            }))}
            placeholder={t("editCard.selectCountry")}
          />
          {formik.touched.country && formik.errors.country && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.country}
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Card Type
          </Typography>
          <DropdownInput
            name="cardType"
            value={formik.values.cardType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardType && !!formik.errors.cardType}
            options={cardTypeOptions}
            placeholder={t("editCard.selectCardType")}
          />
          {formik.touched.cardType && formik.errors.cardType && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.cardType}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "#f7f7f7",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          sx={{ minWidth: 120, padding: "10px 25px !important" }}
          variant="outlined"
        >
          {t("buttons.cancel")}
        </Button>
        <Button
          onClick={formik.handleSubmit}
          color="primary"
          variant="contained"
          sx={{
            minWidth: 120,
            padding: "13px 25px !important",
            lineHeight: "20px",
          }}
          disabled={loading}
        >
          {loading ? t("buttons.loading") : t("submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
