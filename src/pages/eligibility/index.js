import React from "react";
import HomeLayout from "@/layout/HomeLayout";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";

const EligibilityBox = styled("Box")(({ theme }) => ({
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));

export default function Eligibility() {
  return (
    <EligibilityBox>
      <Container maxWidth="lg" sx={{ paddingY: 4, mt: 13 }}>
        <Paper elevation={3} className="TopSection">
          <Typography variant="h2" align="center" gutterBottom>
            Eligibility
          </Typography>

          <Box>
            <Typography variant="h4" gutterBottom>
              Investor Eligibility:
            </Typography>
            <Typography variant="body3" color="text.primary" paragraph>
              <ul>
                <li>Must be at least 18 years old to invest.</li>
                <li>
                  Should have a basic understanding of using the platform and
                  completing necessary steps.
                </li>
                <li>
                  Required to provide personal and KYC information, including
                  source of wealth, and upload relevant documents such as ID and
                  address proof.
                </li>
                <li>A valid email address is necessary for platform access.</li>
                <li>
                  Must have a secure and accessible payment method linked to the
                  platform.
                </li>
                <li>
                  Should understand the risks associated with investments.
                </li>
                <li>
                  Required to accept the terms and conditions of the platform.
                </li>
                <li>
                  Should be capable of verifying the authenticity of documents
                  submitted for KYC.
                </li>
                <li>
                  Investors should keep their account information confidential.
                </li>
                <li>
                  Platform access may be restricted if any information provided
                  is found to be incorrect or incomplete.
                </li>
              </ul>
            </Typography>

            <Typography variant="h4" gutterBottom>
              Seller Eligibility:
            </Typography>
            <Typography variant="body3" color="text.primary" paragraph>
              <ul>
                <li>Must be 18 years or older to list properties for sale.</li>
                <li>
                  Must provide personal and KYC details, including employment
                  information, and submit documents like ID and proof of
                  address.
                </li>
                <li>
                  Must legally own the property and ensure it has no
                  encumbrances.
                </li>
                <li>
                  Property must be in a freehold area, ready for sale, and used
                  only for residential purposes.
                </li>
                <li>
                  Property should have clear legal title and no ongoing
                  disputes.
                </li>
                <li>
                  The property must be located in a suitable area for
                  investment, preferably with strong demand.
                </li>
                <li>
                  The property must be well-maintained and ready for immediate
                  sale or rent.
                </li>
                <li>
                  The seller must have legal authority to sell the property
                  without any restrictions.
                </li>
                <li>
                  Should provide evidence of property value and any prior sales
                  history if available.
                </li>
                <li>
                  The property must not be subject to any ongoing legal
                  proceedings or disputes.
                </li>
              </ul>
            </Typography>
            <Divider sx={{ marginY: 2, borderColor: "#aba2a2" }} />

            <Typography color="text.primary">
              Last Updated: February 2025
            </Typography>
          </Box>
        </Paper>
      </Container>
    </EligibilityBox>
  );
}

Eligibility.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
