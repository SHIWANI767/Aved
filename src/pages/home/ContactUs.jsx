"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
export default function ContactUs() {
  const [formType, setFormType] = useState("quiry");
  const [inquiry, setInquiry] = useState("");

  const handleFormTypeChange = (event, newType) => {
    if (newType !== null) setFormType(newType);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundImage: 'url("/images/Contact/contact_bg.jpg")', // Place your background image in public/
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        px: 2,
        position: "relative",
      }}
      className="main-sectionGap contactsection"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 6,
          p: 4,
          width: "100%",
          maxWidth: "1000px",
          textAlign: "center",
          position: "relative",
          backgroundColor: "white",
          zIndex: "999",
        }}
      >
        <Box align="center" className="subSection">
          <ScrollAnimation animateIn="zoomIn">
            <Typography
              variant="h2"
              color="#000"
              className="getText"
              style={{ textTransform: "uppercase" }}
            >
              Get specialist advice for residential, commercial or property
            </Typography>
          </ScrollAnimation>
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your Name"
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth placeholder="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Phone Number*"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Select
  fullWidth
  value={inquiry}
  onChange={(e) => setInquiry(e.target.value)}
  displayEmpty
  variant="outlined"
>
  <MenuItem value="" disabled>
    Select
  </MenuItem>
  <MenuItem value="residential">Residential</MenuItem>
  <MenuItem value="commercial">Commercial</MenuItem>
  <MenuItem value="other">Other</MenuItem>
</Select>

          </Grid>
        </Grid>

        <Typography variant="body2" color="#808080" mt={2} mb={2}>
          We're excited to connect with you! <br />
        </Typography>

        <Button variant="contained" color="secondary">
          Get A Call Back
        </Button>
      </Paper>
    </Box>
  );
}
