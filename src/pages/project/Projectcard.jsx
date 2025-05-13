// components/Projectcard.js
import { useState } from "react";
import { Button, Typography, Box, Grid, TextField } from "@mui/material";
import RegisterModal from "./RegisterModal";

const Projectcard = ({ title, description, image, ctaText }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="cardContaine">
      <Grid container spacing={7} alignItems="center">
        <Grid item lg={6} md={6} sm={12}>
          <Box
            className="imageSection"
            sx={{ height: "350px", overflow: "hidden" }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Grid>

        <Grid item lg={6} md={6} sm={12}>
          <Box className="textSection">
            <Typography variant="h4" className="title">
              {title}
            </Typography>

            <Typography variant="body2" className="description">
              {description}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              {ctaText}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Register Modal */}
      <RegisterModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Projectcard;
