import React, { useState } from "react";
import { Box, Button, Typography, Stack, Grid } from "@mui/material";

const floorPlans = [
  {
    label: "First Floor",
    image: "/images/project/floor-plan.png",
    description: [
      "Consectetur adipiscing elit pellentesque sed elit tempus, consectetur augue vel venenatis neque potenti convallis nulla fringilla tellus dapibus lobortis at molestie tellus quisque molestie.",
      "Consectetur adipiscing elit pellentesque sed elit tempus, consectetur augue vel venenatis neque potenti convallis nulla fringilla tellus dapibus lobortis at molestie tellus quisque molestie.",
      "Consectetur adipiscing elit pellentesque sed elit tempus, consectetur augue vel venenatis neque potenti convallis nulla fringilla tellus dapibus lobortis at molestie tellus quisque molestie.",
    ],
  },
  {
    label: "Second Floor",
    image: "/images/project/floor-plan.png",
    description:
      "Bel elit nec ultrices id lectus sagittis bibendum. Mauris ante nunc eleifend sed consectetur non ultricies molestie tellus dapibus maximus.",
  },
  {
    label: "Third Floor",
    image: "/images/project/floor-plan.png",
    description:
      "Quisque interdum accumsan velit ac pellentesque. Sed in arcu et nulla gravida fringilla. Pellentesque habitant morbi tristique senectus et netus.",
  },
];

export default function FloorPlanTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box mt={6}>
      <Typography variant="h3" mb={3}>
        Floor Plan
      </Typography>

      {/* Tab Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        {floorPlans.map((plan, index) => (
          <Button
            key={index}
            variant={activeTab === index ? "contained" : "contained"}
            onClick={() => setActiveTab(index)}
            sx={{
              borderRadius: "2px",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              backgroundColor: activeTab === index ? "#5c4d44" : "#fff",
              color: activeTab === index ? "#fff" : "#1A1F36",
              borderColor: "#C0C0C0",
              "&:hover": {
                backgroundColor: activeTab === index ? "#1A1F36" : "#f5f5f5",
              },
            }}
          >
            {plan.label}
          </Button>
        ))}
      </Stack>

      {/* Tab Content */}
      <Box
        sx={{
          p: 3,
          borderRadius: "8px",
          backgroundColor: "#f5f7fa",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} sm={12}>
            <Box
              component="img"
              src={floorPlans[activeTab].image}
              alt={floorPlans[activeTab].label}
              sx={{
                width: "auto",
                maxWidth: "100%",
            
              }}
            />
          </Grid>
          <Grid item lg={7} md={7} sm={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flex: 1 }}
              dangerouslySetInnerHTML={{
                __html: floorPlans[activeTab].description,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
