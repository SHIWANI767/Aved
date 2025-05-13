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
import { useTranslation } from "react-i18next";

export default function AddBankModal({ open, onClose }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // State to handle API errors
  const user = useSelector((state) => state.user);

  // Formik setup for bank details
  const formik = useFormik({
    initialValues: {
      beneficiary: "",
      country: "",
      bank: "",
      accountNumber: "",
      iban: "",
      branchName: "",
      swiftCode: "",
    },
    validationSchema: Yup.object({
      beneficiary: Yup.string()
        .matches(/^[A-Za-z\s]+$/, t("errors.beneficiary.invalid"))
        .required(t("errors.beneficiary.required")),
      bank: Yup.string().required(t("errors.bank.required")),
      branchName: Yup.string().required(t("errors.branch.required")),
      accountNumber: Yup.string()
        .required(t("errors.accountNumber.required"))
        .min(10, t("errors.accountNumber.min")),
      iban: Yup.string().required(t("errors.iban.required")),
      swiftCode: Yup.string().required(t("errors.swiftCode.required")),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setApiError(""); // Clear previous errors
      try {
        const res = await apiRouterCall({
          method: "POST",
          endPoint: "addBank",
          token: user?.userInfo?.token,
          bodyData: {
            beneficiary: values.beneficiary,
            country: values.country,
            bank: values.bank,
            accountNumber: values.accountNumber,
            iban: values.iban,
            branchName: values.branchName,
            swiftCode: values.swiftCode,
          },
        });

        if (res?.data?.responseCode === 200) {
          console.log("Bank Added Successfully:", res.data);
          toast.success(res?.data?.responseMessage);
          formik.resetForm();
          onClose(); // Close modal on success
        } else {
          setApiError(res?.data?.message || "Failed to add bank details");
          toast.error(
            res?.data?.responseMessage ||
              "Something went wrong please try again leter"
          );
        }
      } catch (error) {
        setApiError("Error while adding bank. Please try again.");
        toast.error("Something went wrong please try again leter");
        console.error("API Error:", error);
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
        <Typography variant="h4">Add Bank Information</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        {apiError && (
          <Typography color="#DF3939" variant="body1" sx={{ mb: 2 }}>
            {apiError}
          </Typography>
        )}

        {[
          {
            name: "beneficiary",
            label: t("editBank.beneficiary"),
            placeholder: t("editBank.beneficiaryPlaceholder"),
            maxLength: 50, // reasonable for names
          },
          {
            name: "bank",
            label: t("editBank.bank"),
            placeholder: t("editBank.bankPlaceholder"),
            maxLength: 50,
          },
          {
            name: "accountNumber",
            label: t("editBank.accountNumber"),
            placeholder: t("editBank.accountNumberPlaceholder"),
            maxLength: 20, // depends on banking system, but 20 is typical
          },
          {
            name: "branchName",
            label: t("editBank.branchName"),
            placeholder: t("editBank.branch_placeholder"),
            maxLength: 50,
          },
          {
            name: "iban",
            label: t("editBank.iban"),
            placeholder: t("editBank.ibanPlaceholder"),
            maxLength: 34, // IBAN max standard length
          },
          {
            name: "swiftCode",
            label: t("editBank.swiftCode"),
            placeholder: t("editBank.swiftCodePlaceholder"),
            maxLength: 16,
          },
        ].map(({ name, label, placeholder, maxLength }) => (
          <Box key={name} mt={2}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              {label}
            </Typography>
            <InputBox
              type="text"
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[name] && !!formik.errors[name]}
              placeholder={placeholder}
              maxLength={maxLength}
            />
            {formik.touched[name] && formik.errors[name] && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors[name]}
              </Typography>
            )}
          </Box>
        ))}

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
            placeholder="Select Country"
          />
          {formik.touched.country && formik.errors.country && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.country}
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
          variant="outlined"
          sx={{ minWidth: 120, padding: "10px 25px !important" }}
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
          {loading ?  t("buttons.loading") : t("submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
