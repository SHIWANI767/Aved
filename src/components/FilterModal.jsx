import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  Divider,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from "@mui/system";
import { ExpandMore } from "@mui/icons-material";
import { ApiConfig } from "@/api-services";
import axios from "axios";

const FilterModalBox = styled(Box)(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("xs")]: {
    padding: "10px",
  },
  "& h6": {
    fontSize: "20px",
    fontWeight: "600",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
    color: "#fff",
    "-webkit-text-fill-color": "#fff !important",
  },
  "& .MuiSelect-selectMenu": {
    fontSize: "14px",
  },

  "& .textBox": {
    "& .MuiInputBase-root": {
      background: "transparent",
      boxShadow: "none",
      color: "#fff",
      borderRadius: "0px !important",
      fontSize: "14px",
      height: "33px",
    },

    "& .MuiInput-underline:before": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '"\\00a0"',
      position: "absolute",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderBottom: "1px solid gray",
      pointerEvents: "none",
    },
  },

  "& .buttonBox": {
    padding: "24px 0 0px",
  },
}));
const selectoption2 = [
  { title: "Select Coin" },
  { title: "ETH" },
  { title: "BNB" },
];
const selectoption1 = [
  { title: "Select Exchange" },
  { title: "Binance" },
  { title: "Bitstamp" },
  { title: "Kraken" },
  { title: "OKEX" },
];
const CancelButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,

  svg: {
    fontWeight: "700",
  },
}));

function FilterModal({
  open,
  setOpen,
  filterData,
  setFilterData,
  setFilterStatus,
  type,
}) {
  const [exchangeList, setExchangeList] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const token = window.localStorage.getItem("user_token");

  const getCurrentExchangeListHandler = async () => {
    try {
      // const response = await getDataHandlerAPI("listExchange", token);
      const response = await axios({
        method: "GET",
        url: ApiConfig.listExchange,
        headers: {
          token: token,
        },
      });
      if (response.data.responseCode == 200) {
        let exchangeListData = [];
        for (var i = 0; i < response.data.result.length; i++) {
          exchangeListData.push(response.data.result[i]?.uid);
        }

        setExchangeList(
          exchangeListData?.filter((item) => item !== "coinbasepro")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTokenListHandler = async (_id) => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.exchangeCoins,
        headers: {
          token: token,
        },
        params: {
          uid: _id,
        },
      });
      if (response.data.responseCode === 200) {
        setCoinList(response.data.result.coins);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentExchangeListHandler();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
        classes={{
          paper: "dialog",
        }}
      >
        <FilterModalBox>
          <Typography variant="h6" color="primary">
            Apply Filters
          </Typography>
          <Box mt={2} mb={2}>
            <Divider />
          </Box>

          {/* <Typography variant="body2" color="secondary">
            Filter Name
          </Typography>
          <Box mt={1}>
            <TextField fullWidth variant="outlined" />
          </Box> */}
          <Box mt={2} mb={1}>
            <Typography variant="body2" style={{ color: "#81E396" }}>
              Primary Filter
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography variant="body2" color="primary">
              From exchange (Max 10 exchange)
            </Typography>

            <Box
              mt={1}
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <Autocomplete
                freeSolo
                disableClearable
                fullWidth
                // value="Select Exchange"
                // PaperComponent={({ children }) => (
                //   <Paper className={classes.dropdownBack}>{children}</Paper>
                // )}
                size="small"
                multiple
                limitTags={2}
                options={exchangeList.filter(function (x) {
                  return (
                    filterData.fromExchange.filter(function (y) {
                      return y == x;
                    }).length == 0
                  );
                })}
                onChange={(e, v) => {
                  setFilterData({
                    fromExchange: v,
                    toExchange: filterData.toExchange,
                    toExchange1: filterData.toExchange1,
                    startToken: filterData.startToken,
                  });
                  getTokenListHandler(v[0]);
                }}
                // options={selectoption1.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // placeholder="Percentage"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      endAdornment: (
                        <InputAdornment position="end">
                          <ExpandMore style={{ color: "#fff" }} {...params} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          {type !== "triangular" && (
            <>
              {" "}
              <Box align="center" mt={1}>
                <IconButton>
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src="/images/exchangearbitrage.png"
                    alt="icon"
                  />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="primary">
                  To exchange (Max 10 exchange)
                </Typography>

                <Box
                  mt={1}
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    // PaperComponent={({ children }) => (
                    //   <Paper className={classes.dropdownBack}>{children}</Paper>
                    // )}
                    size="small"
                    multiple
                    limitTags={2}
                    options={exchangeList.filter(function (x) {
                      return (
                        filterData.fromExchange.filter(function (y) {
                          return y == x;
                        }).length == 0
                      );
                    })}
                    onChange={(e, v) => {
                      setFilterData({
                        fromExchange: filterData.fromExchange,
                        toExchange: v,
                        toExchange1: filterData.toExchange1,
                        startToken: filterData.startToken,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // placeholder="Percentage"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMore
                                style={{ color: "#fff" }}
                                {...params}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </>
          )}
          {type == "loop" && (
            <>
              {" "}
              <Box align="center" mt={1}>
                <IconButton>
                  <img
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    src="/images/exchangearbitrage.png"
                    alt="icon"
                  />
                </IconButton>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="primary">
                  To exchange (Max 10 exchange)
                </Typography>

                <Box
                  mt={1}
                  style={{ width: "100%", position: "relative" }}
                  className="autocompleBox"
                >
                  <Autocomplete
                    freeSolo
                    disableClearable
                    fullWidth
                    // PaperComponent={({ children }) => (
                    //   <Paper className={classes.dropdownBack}>{children}</Paper>
                    // )}
                    size="small"
                    multiple
                    limitTags={2}
                    options={exchangeList.filter(function (x) {
                      return (
                        filterData.fromExchange.filter(function (y) {
                          return y == x;
                        }).length == 0
                      );
                    })}
                    onChange={(e, v) => {
                      setFilterData({
                        fromExchange: filterData.fromExchange,
                        toExchange: filterData.toExchange,
                        toExchange1: v,
                        startToken: filterData.startToken,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // placeholder="Percentage"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMore
                                style={{ color: "#fff" }}
                                {...params}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </>
          )}

          <Box mt={3}>
            <Typography variant="body2" style={{ color: "#81E396" }}>
              Secondary Filter
            </Typography>
            <TextField
              fullWidth
              variant="standard"
              placeholder="(This filters are applied locally on the current list)"
            />
          </Box>

          <Box mt={2}>
            <Typography variant="body2" color="primary">
              Buy coin
            </Typography>

            <Box
              mt={1}
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <Autocomplete
                freeSolo
                disableClearable
                fullWidth
                size="small"
                multiple
                limitTags={2}
                options={coinList}
                onChange={(e, v) => {
                  setFilterData({
                    fromExchange: filterData.fromExchange,
                    toExchange: filterData.toExchange,
                    startToken: v,
                  });
                }}
                // value="Select Coin"
                // options={selectoption2.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // placeholder="Percentage"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      endAdornment: (
                        <InputAdornment position="end">
                          <ExpandMore style={{ color: "#fff" }} {...params} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box className="displayCenter buttonBox">
            {/* <Button variant="contained" color="primary">
              SAVE
            </Button>{" "}
            &nbsp; &nbsp; */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setFilterStatus(true);
                setOpen(false);
              }}
            >
              Apply
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="contained"
              color="secondary"
              // onClick={() => setOpen(false)}
              onClick={() => {
                setFilterData(
                  type === "triangular"
                    ? {
                        fromExchange: [],
                        toExchange: [],
                        toExchange1: [],
                        startToken: [],
                      }
                    : {
                        fromExchange: [],
                        toExchange: [],
                        startToken: [],
                        depth: "3",
                      }
                );
                setFilterStatus(false);
                setOpen(false);
              }}
            >
              Reset
            </Button>
          </Box>
          <CancelButton onClick={() => setOpen(false)}>
            <AiOutlineClose fontSize="25px" />
          </CancelButton>
        </FilterModalBox>
      </Dialog>
    </>
  );
}

export default FilterModal;
