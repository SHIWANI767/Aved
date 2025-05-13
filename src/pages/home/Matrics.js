import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Button, // Make sure this is imported
  styled,
  IconButton,
} from "@mui/material";
import AppContext from "@/context/AppContext";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

// Define the styled component
const MatricsComponent = styled("Box")(({ theme }) => ({
  marginTop: "16px",
}));

// Mock data
const data = [
  {
    name: "Metrics 1",
    description:
      "The consensus mechanism that connects stacks and bitcoinThe consensus mechanism that connects stacks and bitcoin.",
    image: "/images/Strategy/strategy_1.svg",
    icon: "/images/direct_Icon.svg",
    value: "2,0000",
  },
  {
    name: "Metrics 1",
    description:
      "The consensus mechanism that connects stacks and bitcoinThe consensus mechanism that connects stacks and bitcoin.",
    image: "/images/Strategy/strategy_2.svg",
    icon: "/images/infra_icon.svg",
    value: "2,0000",
  },

  {
    name: "Metrics 1",
    description:
      "The consensus mechanism that connects stacks and bitcoinThe consensus mechanism that connects stacks and bitcoin.",
    image: "/images/Strategy/strategy_3.svg",
    icon: "images/direct_Icon.svg",
    value: "2,0000",
  },
];

export default function Matrics() {
  // Place useState inside the component
  const [open, setOpen] = useState(false);

  const auth = useContext(AppContext);

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("About");
    }
  }, [auth?.topHeading]);

  // Dialog open/close handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MatricsComponent>
      <Grid container spacing={2.2}>
        <Grid item xs={12} md={4}>
          <Box className="gradienborderBox">
            <Paper
              elevation={2}
              style={{ background: "#1D112F" }}
              className="matrixBox"
            >
              <Box className="displaySpacebetween">
                <Typography variant="h6">Metrics 1</Typography>

                <img
                  style={{ cursor: "pointer" }}
                  src="/images/report.svg"
                  alt="Image"
                  onClick={handleClickOpen}
                />
              </Box>

              <Typography variant="h3" color="primary" mt={3}>
                2,0000
              </Typography>
              <Box className="displayStart" style={{ gap: "10px" }} mt={3}>
                <FaArrowUp style={{ color: "#079455" }} />
                <Typography variant="body2" color="#079455">
                  100%
                </Typography>
                <Typography variant="body2" color="secondary">
                  vs last month
                </Typography>
              </Box>
              <img
                src="/images/graph_1.svg"
                alt="Image"
                className="graphimge"
              />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="gradienborderBox">
            <Paper
              elevation={2}
              style={{ background: "#1D112F" }}
              className="matrixBox"
            >
              <Box className="displaySpacebetween">
                <Typography variant="h6">Metrics 1</Typography>

                <img
                  style={{ cursor: "pointer" }}
                  src="/images/report.svg"
                  alt="Image"
                  onClick={handleClickOpen}
                />
              </Box>

              <Typography variant="h3" color="primary" mt={3}>
                2,0000
              </Typography>
              <Box className="displayStart" style={{ gap: "10px" }} mt={3}>
                <FaArrowUp style={{ color: "#FFD334" }} />
                <Typography variant="body2" color="#FFD334">
                  100%
                </Typography>
                <Typography variant="body2" color="secondary">
                  vs last month
                </Typography>
              </Box>
              <img
                src="/images/yeellow_graph.svg"
                alt="Image"
                className="graphimge"
              />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="gradienborderBox">
            <Paper
              elevation={2}
              style={{ background: "#1D112F" }}
              className="matrixBox"
            >
              <Box className="displaySpacebetween">
                <Typography variant="h6">Metrics 1</Typography>

                <img
                  style={{ cursor: "pointer" }}
                  src="/images/report.svg"
                  alt="Image"
                  onClick={handleClickOpen}
                />
              </Box>

              <Typography variant="h3" color="primary" mt={3}>
                2,0000
              </Typography>
              <Box className="displayStart" style={{ gap: "10px" }} mt={3}>
                <FaArrowUp style={{ color: "#079455" }} />
                <Typography variant="body2" color="#079455">
                  100%
                </Typography>
                <Typography variant="body2" color="secondary">
                  vs last month
                </Typography>
              </Box>
              <img
                src="/images/graph_1.svg"
                alt="Image"
                className="graphimge"
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          <IoCloseSharp style={{ fontSize: "25px" }} />
        </IconButton>

        <DialogContent>
          <Box
            className="displayCenter reportBox"
            style={{ gap: "20px" }}
            mt={2}
          >
            <FaFacebookF style={{ fontSize: "30px" }} />
            <FaXTwitter style={{ fontSize: "30px" }} />
            <GrInstagram style={{ fontSize: "30px" }} />
            <FaLinkedin style={{ fontSize: "30px" }} />
          </Box>
        </DialogContent>
        {/* <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                  Agree
                </Button>
              </DialogActions> */}
      </Dialog>
    </MatricsComponent>
  );
}
