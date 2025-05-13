// components/RegisterModal.js
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const RegisterModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton
          style={{ position: "absolute", right: "0", top: "0" }}
          onClick={handleClose}
        >
          <IoMdClose style={{ color: "#000" }} />
        </IconButton>
        <Typography variant="h3" mb={2}>
          Register your Interest
        </Typography>
        <Typography variant="body2" mb={0}>
          Full Name
        </Typography>
        {/* Add your form fields here */}
        <TextField variant="outlined" placeholder="Enter Full Name" fullWidth />

        <Typography variant="body2" mb={0} mt={2}>
          Email Address
        </Typography>
        {/* Add your form fields here */}
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          fullWidth
        />

        <Typography variant="body2" mb={0} mt={2}>
          Phone Number
        </Typography>
        {/* Add your form fields here */}
        <TextField
          variant="outlined"
          placeholder="Enter your number"
          fullWidth
        />
        <Box className="displayStart" mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" mb={0}>
                Keep me updated on news and offers
              </Typography>
            }
          />
        </Box>

        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClose}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
