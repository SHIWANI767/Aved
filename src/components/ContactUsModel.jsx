import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  DialogActions,
  IconButton,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { reCaptacha } from "@/api-services";
import ReCAPTCHA from "react-google-recaptcha";
import AppContext from "@/context/AppContext";
import axios from "axios";
import { postAPIHandler } from "@/api-services/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "./ButtonCircularProgress";

export default function ContactUsModel({ open, handleClose }) {
  const auth = useContext(AppContext);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formInitialSchema = {
    name: "",
    email: "",
    message: "",
  };

  const initialValues = {
    name: auth?.userData?.name ? auth?.userData?.name : "",
    email: auth?.userData?.email ? auth?.userData?.email : "",
    message: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("First name is required.")
      .max(30, "Should not exceeds 30 characters.")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
        "Please enter a valid name."
      ),

    email: yup
      .string()
      .max(100, "Should not exceeds 100 characters.")
      .email("Please enter a valid email address.")
      .required("Email is required."),

    message: yup
      .string()
      .required("Message is required.")
      .min(3, "Please enter atleast 3 characters.")
      .max(600, "You can enter only 600 characters."),
  });

  const handleSubmitContact = async (values) => {
    try {
      setIsLoading(true);
      const response = await postAPIHandler({
        endPoint: "addContactUs",
        dataToSend: {
          name: values.name,
          email: values.email.toLocaleLowerCase(),
          message: values.message,
        },
      });
      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        handleClose();
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => !isLoading && handleClose()}
        fullWidth
        maxWidth="xs"
      >
        <Formik
          initialValues={formInitialSchema}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmitContact(values)}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <Form>
              <DialogContent>
                <Box mb={3} align="center">
                  <Typography variant="h3" color="primary">
                    Contact Us
                  </Typography>
                </Box>

                <Box mt={3}>
                  <Box>
                    <Typography variant="body2" color="secondary" mb={1}>
                      Name
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    value={values.name}
                    error={Boolean(touched.name && errors.name)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.name && errors.name}
                  </FormHelperText>
                </Box>
                <Box mt={3}>
                  <Box>
                    <Typography variant="body2" color="secondary" mb={1}>
                      Email Address
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </Box>
                <Box mt={3}>
                  <Box>
                    <Typography variant="body2" color="secondary" mb={1}>
                      Message
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Enter message"
                    type="text"
                    name="message"
                    value={values.message}
                    error={Boolean(touched.message && errors.message)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                    multiline
                    rows="5"
                    disabled={isLoading}
                  />
                  <FormHelperText error>
                    {touched.message && errors.message}
                  </FormHelperText>
                </Box>
                <Box mt={2}>
                  <ReCAPTCHA
                    checked={done}
                    sitekey={reCaptacha}
                    onChange={() => setDone(true)}
                    onExpired={() => setDone(false)}
                    disabled={isLoading}
                  />
                </Box>
              </DialogContent>
              <DialogActions style={{ justifyContent: "center" }}>
                <Box mt={3} align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ minWidth: "120px" }}
                    disabled={isLoading}
                    onClick={() => handleClose()}
                  >
                    Close
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ minWidth: "120px" }}
                    disabled={!done || isLoading}
                  >
                    Submit {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
}
