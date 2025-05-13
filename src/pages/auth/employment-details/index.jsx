import { Grid } from "@mui/material";
import React from "react";
import Form from "./Form";
import AuthLayout from "@/layout/AuthLayout";
import CarouselComp from "@/components/Carousel";

function LoginForm() {
  return (
    <Grid container>
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }} // Hide on screens <900px
      >
        <CarouselComp />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <AuthLayout>
          {" "}
          <Form />
        </AuthLayout>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
