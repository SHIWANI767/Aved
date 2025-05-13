import React, { useState } from "react";
import { Box, Typography, Grid, Select, MenuItem, FormControl, Container } from "@mui/material";
import { Globe, DollarSign, Clock } from "lucide-react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import DashboardLayout from "../layout";

// Styled Component
const MainComponent = styled(Box)(({ theme }) => ({
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  overflow: "hidden",
  padding: "20px",
  background: "#fff",
}));

export default function Preference() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("AED");
  const [investment, setInvestment] = useState("Shariah");

  const preferenceOptions = [
    { label: "Language", value: language, setValue: setLanguage, icon: <Globe size={22} color="rgb(37, 130, 106)" />, options: ["English", "Arabic"] },
    { label: "Currency", value: currency, setValue: setCurrency, icon: <DollarSign size={22} color="rgb(37, 130, 106)" />, options: ["AED", "USD"], isCurrency: true },
    { label: "Investment Preferences", value: investment, setValue: setInvestment, icon: <Clock size={22} color="rgb(37, 130, 106)" />, options: ["Shariah", "Conventional"] },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} sm={12} md={10}>
          {/* Title */}
          <Typography variant="h4" fontWeight={600} color="primary" textAlign="left" mt={2} mb={2}>
            Preferences
          </Typography>

          {/* Main Box */}
          <MainComponent>
            <Grid container spacing={2}>
              {preferenceOptions.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5} sm={6} display="flex" alignItems="center">
                    {item.icon}
                    <Typography variant="h5" color="text.secondary" sx={{ ml: 1 }}>
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={6}>
                    <FormControl fullWidth>
                        <Select
                        value={item.value}
                        onChange={(e) => item.setValue(e.target.value)}
                        variant="outlined"
                        size="small"
                        displayEmpty
                        sx={{
                            border: "1px solid black",
                            "& .MuiSvgIcon-root": { color: "rgb(37, 130, 106)" }, // Change dropdown icon color
                            padding: "9px",
                            fontSize: "13px !important",
                            boxShadow:
                            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                            display:"flex !important",
                            alignItems:"center !important",
                            
                            color:"black"

                          }}
                      >
                        {item.options.map((option, i) => (
                          <MenuItem key={i} value={option} sx={{
                            fontWeight: 500,
                            fontSize: "14px",
                            fontFamily: '"Raleway", serif',
                            lineHeight: "20px",
                            ":hover":{
                            color:"green"
                          }}}>
                            {item.isCurrency && option === "AED" ? (
                              <>
                                <Image
                                  src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                                  alt="UAE Flag"
                                  width={20}
                                  height={12}
                                  style={{ marginRight: 8 }}
                                />
                                Saudi Arabian Riyal (SAR) Flag
                              </>
                            ) : (
                              option
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>

            {/* Notification Text */}
            <Box sx={{ borderTop: "1px solid #E2E8F0", marginTop: "24px", pt: 2 }}>
              <Typography variant="h6" sx={{ color: "secondary" }}>
                Head over to the mobile app to manage your notification preferences.
              </Typography>
            </Box>
          </MainComponent>
        </Grid>
      </Grid>
    </Container>
  );
}

// Wrapping Layout
Preference.getLayout = function Profile(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
