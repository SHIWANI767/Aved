import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { themeOptions } from "./typography";

const baseOptions = {
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 1)", // Customize this color as needed
    },
    secondary: {
      main: "rgba(106, 106, 106, 1)", // Customize this color as needed
    },
    background: {
      main: "#080031", // Customize this color as needed
    },
    text: {
      primary: "#505050",
      secondary: "#003a37",
    },
    custom: {
      // Define a custom palette
      main: "#25826A", // Your main color
    },

    // Add more color definitions as needed
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          "@media(min-width:1300px)": {
            maxWidth: "1490px",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(122, 105, 254, 0.25)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "227px",
          backgroundColor: "#100e12",
          // color: "black",
        },
        paperAnchorDockedLeft: {
          borderRight: "0",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          // color: "#FFFFFF !important",
          // background: "#1C1C23 ",
          padding: "10px",
        },
      },
    },

    MuiTableHead: {
      root: {
        background: "rgba(255, 255, 255, 0.91)",
        borderTop: "1px solid #636262",
        "&:hover": {
          backgroundColor: "none",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.03)",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.03)",
        },
      },
    },
    MuiTableRow: {
      root: {
        borderBottom: "1px solid #636262",
        "&:hover": {
          backgroundColor: "#ffffff14",
        },
        "&:last-child": {
          borderBottom: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          padding: "22px 16px",
          fontWeight: 600,
          fontSize: "15px !important",
          color: "#fff",
          whiteSpace: "pre",
        },
        body: {
          color: "#FFFFFF99",
          wordBreak: "break-word",
          fontSize: "14px",
          fontWeight: 400,
          color: "#000",
          borderBottom: "1px solid #FFFFFF08",
          "@media(max-width:767px)": {
            fontSize: "12px !important",
          },
        },
        root: {
          padding: "10px 16px",
          color: "#000",
          // background: "transparent",
          borderBottom: "1px solid #FFFFFF08",
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: "0px",
          border: "none",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          left: "5px",
        },
        track: {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          opacity: "1.38",
          height: "20px",
          borderRadius: "25px",
        },
        thumb: {
          background: "linear-gradient(94deg, #81E396 6.46%, #BEF856 97.99%)",
          width: "16px",
          height: "16px",
          marginTop: "5px",
        },
        root: {
          width: "61px",
          height: "43px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: "#222" },
        colorSecondary: {
          "&.Mui-focused": {
            color: "#222",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: "0px" },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "#000000",
          fontSize: "22px",
          fontWeight: "600",
          lineHeight: "33px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        inputMultiline: {
          padding: "1px !important",
        },
        root: {
          borderRadius: "2px",
          padding: "12px ",
          background: "#F2F2F2",
          position: "relative",

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: { borderColor: "none", borderWidth: "0px" },
        input: {
          borderRadius: "5px",
          color: "rgba(161, 161, 170, 1)",
          padding: "0px",
          fontSize: "16px",
          background: "transparent !important",
          "@media(max-width: 767px)": {
            fontSize: "14px",
          },
          "@media(max-width: 600px)": {
            fontSize: "12px",
          },
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#00000099",
          },
          "&:-internal-autofill-selected": {
            color: "#00000099",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          padding: "20px",
          width: "100%",
        },
        elevation1: {
          background: "rgba(255, 255, 255, 0.46)",
          borderRadius: "15px",
          padding: "20px 20px 10px 20px",
          boxShadow: "none",
          border: "1px solid transparent",
          "@media(max-width:768px)": {
            padding: "0px !important",
          },
        },
        elevation2: {
          position: "relative",
          zIndex: "999",
          // overflow: "hidden",
          padding: "40px 0px 40px 40px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF0D",
          "@media(max-width:767px)": {
            padding: "15px !important",
          },
        },
        elevation3: {
          padding: "40px",
          background: "#1C1A1E",
          borderRadius: "24px",
          boxShadow: "none",
          "@media(max-width:767px)": {
            padding: "15px !important",
          },
        },
        elevation4: {
          padding: "15px",
          background: "#FFFFFF0D",
          borderRadius: "12px",
          boxShadow: "none",
          "@media(max-width:767px)": {
            padding: "12px !important",
          },
        },
        root: {
          boxShadow: "none",
          color: "#fff",
          width: "Auto",
          // '&.MuiAccordion-root .MuiCollapse-wrapper': {
          //   marginTop: "20px !important",
          // },
          "&.MuiAccordion-root": {
            backgroundColor: "none",
            background: "none ",
          },
          "&.MuiAccordion-root.Mui-expanded:last-of-type": {
            background: "none ",
            backgroundColor: "none ",
          },
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
        paper: {
          background: "rgba(255, 255, 255, 0.03)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          alignItems: "self-start",
          color: "#505050 !important",
          fontWeight: "600 !important",
        },
        gutters: {
          paddingLeft: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#FFFFFF1A",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "4px",
          fontSize: "12px",
          color: "#000 !important",
        },
        colorSecondary: {
          "&.Mui-checked": { color: "#25826A" },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          paddingBottom: "0",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          paddingLeft: "0px !important",
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          borderTop: "none",
          borderBottom: "none",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paperScrollPaper: {
          Width: 450,
          maxWidth: "100%",
        },
        paper: {
          // backgroundColor: "#0d0618 !important",
          color: "black",
          overflow: "auto",
          position: "relative",
          borderRadius: "8px",
          padding: "15px 15px 15px 15px",
          "@media(max-width:767px)": {
            margin: "16px",
            padding: "15px",
          },
        },
        paperWidthSm: {
          maxWidth: "500px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          position: "relative",
          borderRadius: "8px",
          background: "#FFFFFF0D",
          border: "1px solid #FFFFFF0D",
          "&::before": {
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            transition:
              "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
          "&::after": {
            borderBottom: "none !important",
            left: "0",
            bottom: "0",
            content: '""',
            position: "absolute",
            right: "0",
            WebkitTransform: "scaleX(0)",
            MozTransform: "scaleX(0)",
            MsTransform: "scaleX(0)",
            transform: "scaleX(0)",
            WebkitTransition:
              "-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
            pointerEvents: "none",
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 400,
          color: "#FFFFFF",
          padding: "14px 10px",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          padding: "0px !important",
          backgroundColor: "#000", // Change the background color here
        },
        inputRoot: {
          height: "46px",
          padding: "5px",
        },
        option: {
          color: "#fff",
          fontSize: "14px !important",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
          textAlign: "left",
        },
        input: {
          width: "0",
          color: "#fff",
          fontSize: "13px !important",
          fontWeight: "400",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#87878726",
          textTransform: "capitalize",

          "&:hover": {
            textDecoration: "none",
            backgroundColor: "none",
            // border: "1px solid rgba(255, 255, 255, 0.60)",
          },
        },
        containedSecondary: {
          position: "relative",
          display: "inline-block",
          color: "#fff",
          background: "rgb(92, 77, 68)",
          padding: "13px 30px",
          textTransform: "uppercase",
          fontSize: "12px",
          fontWeight: "700",
          borderRadius: "1px",
          whiteSpace: "pre",
          lineHeight: "22px",
          letterSpacing: "2px",
          overflow: "hidden",
          zIndex: 1,
          transition: "color 0.3s ease",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "0%",
            height: "100%",
            backgroundColor: "#ffffff",
            zIndex: -1,
            transition: "width 0.4s ease-in-out",
          },

          "&:hover": {
            color: "#232323",
          },

          "&:hover::before": {
            width: "100%",
          },
          "@media (max-width: 780px)": {
            padding: "10px 20px",
          },
        },
        containedPrimary: {
          position: "relative",
          display: "inline-block",
          color: "#232323",
          padding: "13px 30px",
          textTransform: "uppercase", // only one
          fontSize: "12px",
          fontWeight: "700",
          borderRadius: "1px",
          background: "#ffffff",
          whiteSpace: "pre",
          lineHeight: "22px",
          letterSpacing: "2px",
          overflow: "hidden",
          zIndex: 1,
          transition: "color 0.3s ease",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "0%",
            height: "100%",
            backgroundColor: "rgb(92, 77, 68)", // hover background
            zIndex: -1,
            transition: "width 0.4s ease-in-out",
          },

          "&:hover": {
            color: "#fff",
          },

          "&:hover::before": {
            width: "100%",
          },
          "@media(max-width: 767px)": {
            padding: "12px 15px",
          },
          "@media(max-width: 600px)": {
            padding: "9px 13px",
          },
        },
        outlinedPrimary: {
          color: "#000",
          padding: "12px 35px",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: "600",
          borderRadius: "12px",
          background: "#fff",
          whiteSpace: "pre",
          border: "1px solid rgb(37,130,106)",
          "&:hover": {
            color: "#fff",
            border: "1px solid rgb(37,130,106)",
            background: "linear-gradient(45deg, #25826A, #35a47f)",
          },
          "@media(max-width: 1300px)": {
            fontSize: "12px",
            padding: "13px 35px",
          },
          "@media(max-width: 767px)": {
            fontSize: "12px",
            padding: "12px 15px",
          },
          "@media(max-width: 600px)": {
            fontSize: "12px",
            padding: "9px 13px",
          },
          "@media(max-width: 450px)": {
            fontSize: "12px",
            padding: "8px 11px",
          },
        },
        outlinedSecondary: {
          color: "#fff",
          padding: "10px 24px",
          textTransform: "capitalize",
          fontSize: "14px",
          fontWeight: "400",
          borderRadius: "8px",
          border: "1px solid #FFFFFF1A",
          background: "transparent",
          whiteSpace: "pre",
          "&:hover": {
            color: "#fff",
            background: "transparent",
            boxShadow:
              "0 1px 0 0 #5CFF80, 0 -1px 0 0 #5CFF80, 1px 0 0 0 #BEF856, -1px 0 0 0 #81e396, 1px -1px 0 0 #BEF856, -1px 1px 0 0 #BEF856, 1px 1px 0 0 #BEF856, -1px -1px 0 0 #72ff90",
          },
          "@media (max-width: 780px)": {
            padding: "10px 20px",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#000",
        },
        root: {
          // height: "48px",
          padding: "16px 12px 10px 7px",
          background: "#F2F2F2",
          position: "relative",
          color: "#000",
          textAlign: "left",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          outline: "0",
          background: "#fff",
          boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          color: "#000",
          padding: "10px 10px 10px 10px",

          // backdropFilter: "blur(40px)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { paddingLeft: "20px", fontSize: "13px" },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: "transparent !important",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          // padding: "0px 65px !important",
          "@media (max-width: 780px)": {
            // padding: "0px 16px !important",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none !important",
          cursor: "pointer",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // marginBottom: "0.1em",
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000 !important",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          "& .MuiPickersArrowSwitcher-button": {
            // backgroundColor: "transparent !important",
            // color: "#000 !important",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            backgroundColor: "transparent !important",
            color: "#b9b1b1 !important",
            marginLeft: "-15px !important",
          },
          "& .MuiPickersYear-root": {
            backgroundColor: "transparent !important",
            color: "#b9b1b1 !important",
            marginLeft: "-15px !important",
          },

          "& .MuiPaper-root-MuiPickersPopper-paper": {
            background: "#000 !important",
          },
          "& .Mui-selected": {
            backgroundColor: "#25826A !important",
            color: "#fff !important",
            border: "none !important",
            borderRadius: "10px !important",
          },
          "& .MuiPickersCalendarHeader-root": {
            paddingLeft: "30px",
          },
          "& .MuiDayCalendar-slideTransition": {
            minHeight: "210px !important",
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            fontSize: "15px",
          },
          // "& .MuiInputBase-root": {
          //   padding: "0px !important",
          // },
          "& .MuiSvgIcon-root": {
            color: "#25826A !important",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    },
  },
};

export const createCustomTheme = (config = {}) => {
  let theme = createTheme({ ...baseOptions, ...themeOptions });

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
