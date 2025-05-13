import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { useTranslation } from "react-i18next";

const style = {
  mainBox: {
    background: "linear-gradient(45deg, #25826a63, #35a47f1f)",
    padding: "1%",
    borderRadius: "15px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
  },
  window: {
    background: "#25826A",
    padding: "10px",
    borderRadius: "50%",
    color: "#fff",
    height: "30px",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default function ExitWindow() {
  const { t } = useTranslation();
  return (
    <Grid
      container
      justifyContent={"space-between"}
      // spacing={2}
      sx={style.mainBox}
    >
      <Grid lg={8} md={8} sm={12} xs={12}>
        <Box sx={style.box}>
          <Box sx={style.window}>
            <GridViewOutlinedIcon color="white" />
          </Box>
          <Box>
            <Typography variant="h5">{t("exit_window_closed")}</Typography>
            <Typography>{t("secondary_listings_info")}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        sx={{
          mt: { md: 3, lg: 0, sm: 3, xs: 3 },
          ml: { md: 8, lg: 0, sm: 8, xs: 8 },
        }}
      >
        <Box sx={style.box}>
          <Box>
            <Typography>{t("next_window")}</Typography>
            <Typography variant="h5" className="outfitFonts">
              6 May 2025, 01:30
            </Typography>
          </Box>
          <Button variant="contained">{t("learn_more")}</Button>
        </Box>
      </Grid>
    </Grid>
  );
}
