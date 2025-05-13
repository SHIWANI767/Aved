import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { apiRouterCall } from "@/api-services/service";
import { useTranslation } from "next-i18next";

const depositOptions = [1000, 2000, 3000, 4000, 5000];

export default function DepositMoneyModal({ open, onClose, paymentWindowRef }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [fund, setFund] = useState({})
  const { t } = useTranslation();
  const getFundSettings = async () => {
    try {
      const res =  await apiRouterCall({
        method: "GET",
        endPoint: "getFundSettings",
      
      })
      if (res.data.responseCode === 200) {
        const result = res?.data?.result || {};
        console.log(result)

        setFund(result);
      }
    } catch (error) {
      console.error("Error fetching fund settings:", error);
    }
  };
  useEffect(()=>{ if (open) getFundSettings();},[open])
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required(t("depositSection.amount_required"))
        .min(fund.depositMinLimit, t("value_cannot_be_smaller"))
        .max(fund.depositMaxLimit, t("value_cannot_be_greater")),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await apiRouterCall({
          method: "POST",
          endPoint: "initiate",
          token: user?.userInfo?.token,
          bodyData: {
            amount: values.amount * 100,
            currency: "SAR",
            name: user?.userInfo?.fullName,
            email: user?.userInfo?.email,
          },
        });

        console.log(res);

        if (res?.data?.responseCode === 200) {
          toast.success(res?.data?.responseMessage);
          // Get the screen width and height
          const screenWidth = window.screen.width;
          const screenHeight = window.screen.height;

          // Define the popup dimensions
          const popupWidth = 600;
          const popupHeight = 700;

          // Calculate center position
          const left = (screenWidth - popupWidth) / 2;
          const top = (screenHeight - popupHeight) / 2;
          // Open redirect URL in a new small popup
          paymentWindowRef.current = window.open(
            res?.data?.result?._links?.redirect?.href,
            "PaymentWindow",
            `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
          );

          // Close the popup window after 10 seconds
        } else {
          toast.error(res?.data?.responseMessage || "Deposit failed");
        }
      } catch (error) {
        toast.error("Something went wrong, please try again later");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h4">{t("depositSection.title")}</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {t("depositSection.enter_amount")}{" "}
        </Typography>
        <InputBox
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && !!formik.errors.amount}
          placeholder={t("depositSection.enter_amount")}
          maxLength={10}
        />
        {formik.touched.amount && formik.errors.amount && (
          <Typography color="error" variant="body1">
            {formik.errors.amount}
          </Typography>
        )}

        <Box display="flex" gap={1} mt={2}>
          {depositOptions.map((amount) => (
            <Button
              key={amount}
              variant="outlined"
              onClick={() => formik.setFieldValue("amount", amount)}
              sx={{ padding: "0 !important" }}
              className="outfitFonts"
            >
              +{amount}
            </Button>
          ))}
        </Box>
        <br />
        <Typography variant="body3" color="gray" mt={2} className="outfitFonts">
          {t("min")}{":"}{fund.depositMinLimit} | {t("max")}{":"}{fund.depositMaxLimit}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "#f7f7f7", justifyContent: "center", gap: 1 }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ minWidth: 120, padding: "10px 25px !important" }}
        >
          {t("depositSection.cancel")}
        </Button>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            minWidth: 120,
            padding: "13px 25px !important",
            lineHeight: "20px",
          }}
        >
          {loading
            ? t("depositSection.processing")
            : t("depositSection.deposit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
