import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const InputContainer = styled(Box)(({ bgColor }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: bgColor || "white",
  borderRadius: "4px",
}));

const StyledTextField = styled(TextField)(({ error, placeholderColor }) => ({
  "& .MuiInputBase-input": {
    fontFamily: "Outfit, sans-serif",
    fontSize: "14px",
    color: "#00000099",
    fontWeight: 400,
    "&::placeholder": {
      color: placeholderColor || "#333",
    },
  },
  "& .MuiOutlinedInput-root": {
    border: "1px solid #E4E4E7",
    "& fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#E4E4E7"} !important`,
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#25826A"}`,
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#25826A"}`,
      borderRadius: "8px",
    },
    "& .MuiSvgIcon-root": {
      fill: "#25826A !important",
    },
  },
}));

const DateInputBox = ({
  name,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder,
  placeholderColor,
  color,
  backgroundColor,
  borderRadius,
  width,
  height,
  onBlur,
  onPointerLeave,
  disabled,
  error = false,
}) => {
  return (
    <InputContainer bgColor={backgroundColor}>
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(newValue) =>
          onChange({
            target: {
              name,
              value: newValue ? newValue.format("YYYY-MM-DD") : "",
            },
          })
        }
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        disabled={disabled}
        slotProps={{
          textField: {
            name,
            placeholder,
            onBlur,
            onPointerLeave,
            fullWidth: true,
            error,
            sx: {
              border: "1px solid #E4E4E7",
              background: "#25826a0f",
              color: color,
              backgroundColor: backgroundColor,
              borderRadius: borderRadius,
              width: width || "100%",
              height: height,
              fontSize: "14px",
              fontWeight: "300",
              fontFamily: "Outfit",
              // padding: "-5px",
              "& .MuiInputBase-root": {
                padding: "9px",
              },
              "& .MuiSvgIcon-root": {
                color: "#25826A !important",
              },
            },
          },
        }}
        renderInput={(params) => (
          <StyledTextField {...params} placeholderColor={placeholderColor} />
        )}
      />
    </InputContainer>
  );
};

DateInputBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string, // format: "YYYY-MM-DD"
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.string, // format: "YYYY-MM-DD"
  maxDate: PropTypes.string, // format: "YYYY-MM-DD"
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  onBlur: PropTypes.func,
  onPointerLeave: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default DateInputBox;
