import React, { useContext, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";
import AppContext from "@/context/AppContext";
import HomeLayout from "@/layout/HomeLayout";

const PrivacyComponent = styled("Box")(({ theme }) => ({
  "& .privacyMainBox": {},
   "& h6":{
      lineHeight:"30px",
    }
}));

export default function PrivacyPolicy() {
  const auth = useContext(AppContext);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("Terms & Conditions");
    }
  }, [auth?.topHeading]);
  return (
    <PrivacyComponent>
      <Box mb={3} className="termBoxmain">
        <Container>
          <Typography variant="h3" color="#fff">
            Privacy Policy
          </Typography>

          <Typography variant="body2" color="#FFFFFF" mt={1}>
            Last Updates 24/06/2024
          </Typography>
        </Container>
      </Box>
      <Container style={{ marginBottom: "50px" }}>
        <Typography variant="h6" color="primary" mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
          luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
          sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
          sit amet lacus accumsan et viverra justo commodo. Proin sodales
          pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
          vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
          odio.
        </Typography>
        <Typography variant="h6" color="primary" mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
          luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
          sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
          sit amet lacus accumsan et viverra justo commodo. Proin sodales
          pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
          vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
          odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
          luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
          sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
          sit amet lacus accumsan et viverra justo commodo. Proin sodales
          pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
          vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
          odio.
        </Typography>
        <Typography variant="h6" color="primary" mb={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
          luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
          sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
          sit amet lacus accumsan et viverra justo commodo. Proin sodales
          pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
          vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
          odio.
        </Typography>
      </Container>
    </PrivacyComponent>
  );
}
PrivacyPolicy.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
