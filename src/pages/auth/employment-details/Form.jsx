import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Typography } from "@mui/material";
import InputBox from "@/components/InputBoxes/InputBox";
import DropdownInput from "@/components/InputBoxes/DropdownInput";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import countries from "@/components/InputBoxes/country";
import { useRouter } from "next/router";


const EmploymentForm = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user)
  const [employData, setEmployData] = useState({})
  const [loader, setLoader] = useState(false)


  const getKYCDetails = async() => {
    try {
      const response = await apiRouterCall({
        method:"GET",
        endPoint: "getKycDetail",
        token: user?.userInfo?.token
      })
      if (response?.data?.responseCode === 200) {
        setEmployData(response?.data?.result || {})
      } else {
        console.log("This is my error in the else block", response?.data)
      }
    } catch (error) {
      console.log("This is my error in the catch block", error)
    }
  };

  useEffect(() => {
    getKYCDetails();
  },[])

  const formik = useFormik({
    initialValues: {
      employerName: employData?.employerName ? employData?.employerName : "",
      country: employData?.country ? employData?.country : "",
      employerAddress: employData?.employerAddress ? employData?.employerAddress : "",
      sourceOfWealth: employData?.sourceOfWealth ? employData?.sourceOfWealth : "",
      employment: employData?.employment ? employData?.employment : "",
    },
    enableReinitialize: true,  
    validationSchema: Yup.object({
      employerName: Yup.string().required("Employer Name is required"),
      country: Yup.string().required("Country of employment is required"),
      employerAddress: Yup.string().required("Employer Address is required"),
      sourceOfWealth: Yup.string().required("Source of wealth is required"),
      employment: Yup.string().required("Employment type is required"),
    }),


    onSubmit: async (values) => {
      try {
        setLoader(true);
        const response = await apiRouterCall({
          method: "POST",
          endPoint: "addKYCDetails",
          token: user?.userInfo?.token,
          bodyData: {
            employerName: values.employerName,
            country: values.country,
            employerAddress: values.employerAddress,
            sourceOfWealth: values.sourceOfWealth,
            employment: values.employment
          }
        })
        if (response?.data?.responseCode === 200) {
          toast.success(response?.data?.responseMessage)
          router.push('/auth/kyc')
          formik.resetForm();
          sessionStorage.setItem("employmentForm", router.pathname);
        } else {
          toast.error(response?.data?.responseMessage);
          console.log("This is the error in the else section", response?.data)
        }
      } catch (error) {
          console.log(error,"This is my error in the catch section")
      }finally{
        setLoader(false);
      }
    },
  });
 

  return (
    <Container maxWidth="sm">
    <Typography variant="title2">Employment Details</Typography>
    <Typography variant="h6" color="#8f8787">
    Provide your employment details to continue your journey with Nesba.
    </Typography>
    <form onSubmit={formik.handleSubmit}>
      <Box mt={2}>
        <Typography variant="h6">Employer Name*</Typography>
        <InputBox
          type="text"
          name="employerName"
          placeholder="Enter Employer Name"
          value={formik.values.employerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.employerName && !!formik.errors.employerName}
        />
        {formik.touched.employerName && formik.errors.employerName && (
          <Typography color="#DF3939" variant="body1">
            {formik.errors.employerName}
          </Typography>
        )}
      </Box>
  
      <Box mt={1}>
        <Typography variant="h6">Country of Employment*</Typography>
        <DropdownInput
  name="country"
  value={formik.values.country}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.country && !!formik.errors.country}
  options={[
    { value: "IN", label: "India" },
    { value: "US", label: "USA" },
  ]}
  placeholder="Select a country"
/>

          {formik.touched.country && formik.errors.country && (
            <Typography color="#DF3939" variant="body1">
              {formik.errors.country}
            </Typography>
          )}
      </Box>
  
      <Box mt={1}>
        <Typography variant="h6">Employer Address*</Typography>
        <InputBox
          type="text"
          name="employerAddress"
          placeholder="Enter Employer Address"
          value={formik.values.employerAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.employerAddress && !!formik.errors.employerAddress
          }
        />
        {formik.touched.employerAddress && formik.errors.employerAddress && (
          <Typography color="#DF3939" variant="body1">
            {formik.errors.employerAddress}
          </Typography>
        )}
      </Box>
  
      <Box mt={1}>
        <Typography variant="h6">Source of Wealth*</Typography>
        <DropdownInput
          name="sourceOfWealth"
          value={formik.values.sourceOfWealth}
          onChange={formik.handleChange}
          options={[
            { value: "SAVINGS", label: "Savings" },
            { value: "INVESTMENTS", label: "Investments" },
          ]}
          placeholder="Select Source of Wealth"
          error={formik.touched.sourceOfWealth && !!formik.errors.sourceOfWealth}
        />
        {formik.touched.sourceOfWealth && formik.errors.sourceOfWealth && (
          <Typography color="#DF3939" variant="body1">
            {formik.errors.sourceOfWealth}
          </Typography>
        )}
      </Box>
  
      <Box mt={1}>
        <Typography variant="h6">Employment Type*</Typography>
        <DropdownInput
          name="employment"
          value={formik.values.employment}
          onChange={formik.handleChange}
          options={[
            { value: "EMPLOYED", label: "Employed" },
            { value: "SELF_EMPLOYED", label: "Self Employed" },
          ]}
          placeholder="Select Employment Type"
          error={formik.touched.employment && !!formik.errors.employment}
        />
        {formik.touched.employment && formik.errors.employment && (
          <Typography color="#DF3939" variant="body1">
            {formik.errors.employment}
          </Typography>
        )}
      </Box> 
  
      <Box mt={4} display="flex" justifyContent="center">
        <Button variant="contained" disabled={loader} type="submit" sx={{ width: "100%" }} >
         {loader ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </form>
  </Container>
  
  );
};

export default EmploymentForm;
