import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import ButtonCircularProgress from "../ButtonCircularProgress";

const styles = {
  "& .MuiButton-root": {
    minWidth: "150px",
  },
};

export default function Popup({
  maxWidth,
  open,
  handleClose,
  title,
  children,
  actions,
  titleIcon,
  isLoading,
  isRemove,
}) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={maxWidth}
      fullWidth
      keepMounted
    >
      <DialogTitle
        sx={{ m: 0, padding: 0, fontSize: "30px" }}
        id="customized-dialog-title"
      >
        <IconButton
          onClick={handleClose}
          size="large"
          disabled={isLoading}
          className="closeIconButton"
        >
          <CloseIcon />
        </IconButton>
        {titleIcon && (
          <Box mr={1} className="arrowIconButton">
            {titleIcon}
          </Box>
        )}
        <Box className="displayCenter">
          <Box display="flex" alignItems="center">
            {title}
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions.length > 0 && (
        <DialogActions style={{ justifyContent: "center" }}>
          {actions.map((action, index) => (
            <Button
              small
              key={index}
              onClick={action.onClick}
              disabled={action.isLoading || isLoading}
              color={action.color}
              variant={action.variant}
              sx={{
                minWidth: "150px",
                display: action.isRemove ? "none" : "flex",
                ...(action.color === "primary" &&
                  action.variant === "contained" && {
                    backgroundColor: "#DF3939",
                  }),
              }}
            >
              {action.label}
              {action.isLoading && <ButtonCircularProgress />}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
