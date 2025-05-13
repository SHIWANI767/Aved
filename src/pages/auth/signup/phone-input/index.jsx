import { Grid } from "@mui/material";
import React from "react";
import CarouselComp from "@/components/Carousel";
import Form from "./Form";

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
        <Form />
      </Grid>
    </Grid>
  );
}

export default LoginForm;
