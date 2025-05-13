import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { apiRouterCall } from "@/api-services/service";
import { useTranslation } from "react-i18next";

const withdrawOptions = [1000, 2000, 3000, 4000];

export default function WithdrawMoneyModal({
  open,
  onClose,
  availableBalance,
  getWalletData
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const user = useSelector((state) => state.user);
    const [fund, setFund] = useState({})
  
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

  const fetchBanks = async () => {
    setLoadingBanks(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "viewBankDetails",
        token: user?.userInfo?.token,
      });
      if (res?.data?.responseCode === 200)
        setBankList(res.data.result?.docs || []);
    } catch {
      toast.error("Error fetching bank details.");
    } finally {
      setLoadingBanks(false);
    }
  };

  const fetchCards = async () => {
    setLoadingCards(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "viewCardDetails",
        token: user?.userInfo?.token,
      });
      if (res?.data?.responseCode === 200) setCardList(res.data.result || []);
    } catch {
      toast.error("Error fetching card details.");
    } finally {
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchBanks();
      fetchCards();
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      amount: "",
      withdrawalMethod: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required(t("withdrawSection.amount_required"))
        .min(fund.withdrawalMinLimit, t("value_cannot_be_smaller"))
        .max(fund.withdrawalMaxLimit, t("value_cannot_be_greater")),
      withdrawalMethod: Yup.string().required(
        t("withdrawSection.withdrawal_method")
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payoutMethod = bankList.find(
          (b) => b._id === values.withdrawalMethod
        )
          ? "BANK"
          : "CARD";
        const bodyData = {
          amount: values.amount,
          payoutMethod,
          bankId: payoutMethod === "BANK" ? values.withdrawalMethod : undefined,
          cardId: payoutMethod === "CARD" ? values.withdrawalMethod : undefined,
        };
        const res = await apiRouterCall({
          method: "POST",
          endPoint: "withdrawalMoney",
          token: user?.userInfo?.token,
          bodyData,
        });

        if (res?.data?.responseCode === 200) {
          toast.success("Withdrawal request submitted successfully");
          getWalletData()
          onClose();
        } else {
          toast.error(res?.data?.responseMessage || "Withdrawal failed");
        }
      } catch {
        toast.error("Something went wrong, please try again later");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {t("withdrawSection.title")}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          {t("withdrawSection.total_funds")}
        </Typography>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#25826A"
          sx={{ mb: 2 }}
          className="outfitFonts"
        >
          SAR {availableBalance?.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {t("withdrawSection.enter_amount")}
        </Typography>
        <InputBox
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && !!formik.errors.amount}
          placeholder={t("withdrawSection.min_max")}
        />
        {formik.touched.amount && formik.errors.amount && (
          <Typography color="error" variant="body3" className="outfitFonts">
            {formik.errors.amount}
          </Typography>
        )}
                <br />
                <Typography variant="body3" color="gray" mt={2} className="outfitFonts">
                  {t("min")}{":"}{fund.withdrawalMinLimit} | {t("max")}{":"}{fund.withdrawalMaxLimit}
                </Typography>
        <Box display="flex" gap={1} mt={2}>
          {withdrawOptions.map((amount) => (
            <Button
              key={amount}
              variant="outlined"
              className="outfitFonts"
              sx={{ minWidth: 80, background: "#E6F4E6", padding: 0 }}
              onClick={() => formik.setFieldValue("amount", amount)}
            >
              +{amount}
            </Button>
          ))}
        </Box>
        <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
          {t("withdrawSection.withdrawal_method")}
        </Typography>
        {loadingBanks || loadingCards ? (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          <RadioGroup
            name="withdrawalMethod"
            value={formik.values.withdrawalMethod}
            onChange={formik.handleChange}
          >
            {/* BANKS */}
<Typography variant="body3" sx={{ mt: 2 }}>
  {t("withdrawSection.bank_accounts")}
</Typography>
{bankList.length > 0 ? (
  bankList.map((bank) => (
    <FormControlLabel
      key={bank._id}
      sx={{ fontFamily: "Outfit" }}
      value={bank._id}
      control={<Radio />}
      label={
        <Typography className="outfitFonts">
          {`${bank.bank} ${t("withdrawSection.bank_suffix")}${bank.accountNumber.slice(-4)}`}
        </Typography>
      }
    />
  ))
) : (
  <Typography color="text.secondary"  sx={{ ml: 2, mt:2 }}>
    {t("withdrawSection.no_bank_linked")}
  </Typography>
)}

{/* CARDS */}
<Typography variant="body3" sx={{ mt: 3 }}>
  {t("withdrawSection.cards")}
</Typography>
{cardList.length > 0 ? (
  cardList.map((card) => (
    <FormControlLabel
      key={card._id}
      value={card._id}
      control={<Radio />}
      label={
        <Typography className="outfitFonts">
          {`${card.cardType} ${t("withdrawSection.card_suffix")}${card.cardNumber.slice(-4)}`}
        </Typography>
      }
    />
  ))
) : (
  <Typography color="text.secondary"  sx={{ ml: 2, mt:2 }}>
    {t("withdrawSection.no_card_added")}
  </Typography>
)}

          </RadioGroup>
        )}
        {/* {formik.touched.withdrawalMethod && formik.errors.withdrawalMethod && (
          <Typography color="error" variant="body3">
            {formik.errors.withdrawalMethod}
          </Typography>
        )} */}
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "#f7f7f7", justifyContent: "center", gap: 1 }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 120, padding: "10px 25px !important" }}
        >
          {t("withdrawSection.cancel")}
        </Button>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          sx={{
            minWidth: 120,
            padding: "13px 25px !important",
            lineHeight: "20px",
          }}
          disabled={loading ||  !formik.isValid }
        >
          {loading
            ? t("withdrawSection.processing")
            : t("withdrawSection.withdraw")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
