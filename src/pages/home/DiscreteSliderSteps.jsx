import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];
// Customized slider using Material-UI's styled API
const CustomSlider = styled(Slider)({
  color: "#3880ff", // Customize the primary color
  height: 26, // Customize the height of the slider track
  background: "#2E1B4A",
  borderRadius: 8, // Rounded rail
  "& .MuiSlider-thumb": {
    height: 50, // Customize thumb height
    width: 24, // Customize thumb width
    backgroundColor: "#fff", // Thumb background color
    borderRadius: 5,
    border: "0", // Thumb border
    "&:hover": {
      boxShadow: "0px 0px 0px 8px rgba(56,128,255,0.16)", // Thumb hover effect
    },
    "&.Mui-active": {
      boxShadow: "0px 0px 0px 14px rgba(56,128,255,0.16)", // Active thumb effect
    },
  },
  "& .MuiSlider-track": {
    height: 50, // Customize track height
    borderRadius: 4, // Rounded track
    // background: "rgba(29, 17, 47, 1)",
    background: "rgb(2,0,36)",
    background:
      "linear-gradient(90deg, rgba(255,211,52,1) 0%, rgba(0,255,155,1) 100%)",
    border: "2px solid",

    borderImageSource: "linear-gradient(360deg, #0E0719 0%, #2E1B4A 100%)",

    border: "0",
  },
  "& .MuiSlider-rail": {
    height: 55, // Customize rail height (the part behind the slider track)
    borderRadius: 8, // Rounded rail
    opacity: 0.5, // Lower opacity for the rail
    background: "linear-gradient(360deg, #0E0719 0%, #2E1B4A 100%)",
    padding: "2px",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#2F1C4B", // Customize mark color
    height: 20, // Customize mark height
    width: 0.15, // Customize mark width
    borderRadius: "0", // Make marks round
  },
  "& .MuiSlider-markLabel": {
    color: "#fff", // Customize label color
    fontSize: "12px", // Customize label font size
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSliderSteps() {
  const [value, setValue] = React.useState(625); // State to keep track of slider value

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the value when slider is changed
  };

  return (
    <Box
    // sx={{ width: 300 }}
    >
      <CustomSlider
        aria-label="Custom marks"
        defaultValue={625}
        getAriaValueText={valuetext}
        step={25} // Use a step value that divides the range into equal parts
        marks={marks}
        min={500}
        max={750}
        valueLabelDisplay="auto"
        value={value} // Bind slider value to state
        onChange={handleChange} // Update state on slider change
      />
    </Box>
  );
}
