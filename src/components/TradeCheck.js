import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  FormHelperText,
  Paper,
  FormControl,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import {
//   dataPostHandler,
//   getDataHandlerAPI,
// } from "@/apiConfig/service/index";
import { toast } from "react-hot-toast";
// import apiConfigs from "src/apiConfig/ApiConfig";
import axios from "axios";
import PageLoader from "./PageLoader";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import { dataPostHandler, getDataHandlerAPI } from "@/api-services/service";
import { ApiConfig } from "@/api-services";
import { handleNegativeValue } from "@/utils";
import ButtonCircularProgress from "./ButtonCircularProgress";

const TradeCheckBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& p": {
    fontSize: "14px",
    fontWeight: "300",
  },

  "& .dropdownBack": {
    background: theme.palette.background.paperBack,
  },

  "& .formBox": {
    "& p": {
      marginBottom: "5px",
      fontSize: "14px",
    },
  },
}));
export default function TradeCheck({
  open,
  setIsAutoTradeModal,
  type,
  botType,
}) {
  const auth = useContext(AppContext);
  const [exchangeList, setExchangeList] = useState([]);
  const [autoTradeExchange1Data, setAutoTradeExchange1Data] = useState([]);
  const [autoTradeExchange2Data, setAutoTradeExchange2Data] = useState([]);
  const [autoTradeExchange2Data1, setAutoTradeExchange2Data1] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidExchanges, setIsValidExchanges] = useState(true);
  const [isAutoTradeOn, setIsAutoTradeOn] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const token = window.localStorage.getItem("token");
  const [isSubmit, setisSubmit] = useState(false);
  const [filtersData, setFiltersData] = useState({
    exchange1: [],
    exchange2: [],
    orderType: "",
  });

  const orderTypeData = [
    {
      label: "LIMIT",
      value: "LIMIT",
    },
    {
      label: "MARKET",
      value: "MARKET",
    },
  ];
  useEffect(() => {
    setFiltersData({
      ...filtersData,
      ["exchange1"]: autoTradeExchange1Data ? autoTradeExchange1Data : [],
      ["exchange2"]: autoTradeExchange2Data ? autoTradeExchange2Data : [],
      ["orderType"]: autoTradeExchange2Data1 ? autoTradeExchange2Data1 : [],
    });
  }, [autoTradeExchange1Data, autoTradeExchange2Data]);

  useEffect(() => {
    let checkAutoSniper;
    if (botType == "autoTradeSetting") {
      checkAutoSniper = "autoTrade";
    } else {
      checkAutoSniper = "sniperBot";
    }

    if (auth.userData?.[checkAutoSniper] && type == "Direct") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.direct);
    } else if (auth.userData?.[checkAutoSniper] && type == "Intra") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.intraSingleExchange);
    } else if (auth.userData?.[checkAutoSniper] && type == "Loop") {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.loop);
    } else {
      setIsAutoTradeOn(auth.userData?.[checkAutoSniper]?.triangular);
    }
  }, [auth.userData]);
  const [autoTradeData, setAutoTradeData] = useState({
    fromExchange: [],
    toExchange: [],
    toExchange1: [],
    capital: 0,
    threshold: 0,
    Minthreshold: 0,
    fromCoins: [],
    toCoins: [],
  });
  const [isValidThreshold, setIsValidThreshold] = useState(true);
  // get data autoTrade
  function findGETAPIEndPoint() {
    if (type === "Direct") {
      return "getDataAutoTradeOnOff";
    } else if (type === "Intra") {
      return "getDataAutoTradeOnOffArb";
    } else if (type === "Loop") {
      return "autoTradeOnOffLoop";
    } else {
      return "getDataAutoTradeOnOffTran";
    }
  }

  // sniperTrade
  function findGETSiniperAPIEndPoint() {
    if (type === "Direct") {
      return "getDataSniperBotOnOff";
    } else if (type === "Intra") {
      return "sniperBotOnOffIntraArb";
    } else if (type === "Loop") {
      return "sniperBotOnOffLoop";
    } else {
      return "getDataSniperBotOnOffTran";
    }
  }
  const getDataAutoTradeOnOffHander = async () => {
    try {
      let apiEndPointCheck;
      if (botType == "autoTradeSetting") {
        apiEndPointCheck = findGETAPIEndPoint();
      } else {
        apiEndPointCheck = findGETSiniperAPIEndPoint();
      }

      const response = await getDataHandlerAPI(apiEndPointCheck);
      if (response) {
        setAutoTradeData({
          capital: response?.capital,
          Minthreshold: response?.minThreshold,
        });
        if (type === "Direct") {
          setAutoTradeExchange1Data(response?.exchange1);
        } else {
          setAutoTradeExchange1Data(response?.exchangeUID);
        }
        setAutoTradeExchange2Data(response?.exchange2);
        setAutoTradeExchange2Data1(response?.orderType);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //autoTrade Post
  function findAPIEndPoint() {
    if (type === "Direct") {
      return "autoTradeOnOffDirectArb";
    } else if (type === "Intra") {
      return "autoTradeOnOffIntraArb";
    } else if (type === "Loop") {
      return "autoTradeOnOffLoop";
    } else {
      return "autoTradeOnOffTriangular";
    }
  }

  // sniperTrade POST
  function findSiniperAPIEndPoint() {
    if (type === "Direct") {
      return "sniperBotOnOffDirectArb";
    } else if (type === "Intra") {
      return "sniperBotOnOffIntraArbOnOf";
    } else if (type === "Loop") {
      return "sniperBotOnOffLoop";
    } else {
      return "sniperBotOnOffTriangular";
    }
  }
  const autoTradeConnectAPIHandler = async () => {
    let apiEndPointCheck;
    if (botType == "autoTradeSetting") {
      apiEndPointCheck = findAPIEndPoint();
    } else {
      apiEndPointCheck = findSiniperAPIEndPoint();
    }

    setisSubmit(true);
    if (autoTradeData?.capital < 50) {
      return;
    }
    const dataToSend =
      type === "Direct"
        ? {
            exchange1: filtersData?.exchange1,
            exchange2: filtersData?.exchange2,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
          }
        : type === "Loop"
        ? {
            exchange1: filtersData?.exchange1,
            exchange2: filtersData?.exchange2,
            exchange3: autoTradeData.toExchange1,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
          }
        : {
            exchangeUID: filtersData?.exchange1,
            capital: Number(autoTradeData.capital),
            minThreshold: Number(autoTradeData.Minthreshold),
            orderType: "LIMIT",
          };

    try {
      setIsProcessing(true);
      const response = await dataPostHandler(apiEndPointCheck, dataToSend);
      if (response.status == 200) {
        toast.success(response.data.responseMessage);
        auth.getProfileDataHandler(window.localStorage.getItem("token"));
        getDataAutoTradeOnOffHander();
        setIsProcessing(false);
        setIsAutoTradeModal(false);
      } else {
        toast.error(response.data.responseMessage);
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
  };

  const getTokenListHandler = async (_id) => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.get_wallet_coinImageData,
        headers: {
          token: token,
        },
        // params: {
        //   uid: _id,
        // },
      });
      if (response.data.responseCode === 200) {
        const coin = response.data.result.map((item) =>
          item.symbol.toUpperCase()
        );
        setCoinList(coin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAutoTradeOn) {
      getDataAutoTradeOnOffHander();
    }
  }, [filtersData?.trade, isAutoTradeOn]);

  useEffect(() => {
    getTokenListHandler();
  }, []);

  useEffect(() => {
    if (auth?.connectedExchangeList) {
      const filterFun = auth?.connectedExchangeList.map((data) => {
        return data?.exchangeUID;
      });
      setExchangeList(filterFun);
      if (type === "Direct" || type === "Intra") {
        if (filterFun.length < 2) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      } else if (type === "Loop") {
        if (filterFun.length < 3) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      } else {
        if (filterFun.length < 1) {
          setIsValidExchanges(false);
        } else {
          setIsValidExchanges(true);
        }
      }
    }
  }, [auth?.connectedExchangeList, type]);

  const autoTradeOffAPIHandler = async () => {
    let EndPoint;
    if (botType == "autoTradeSetting") {
      if (auth.userData?.autoTrade && type == "Direct") {
        EndPoint = "autoTradeOnOffDirectArb";
      }
      if (auth.userData?.autoTrade && type == "Intra") {
        EndPoint = "autoTradeOnOffIntraArb";
      }
      if (auth.userData?.autoTrade && type == "Loop") {
        EndPoint = "autoTradeOnOffLoop";
      }
      if (auth.userData?.autoTrade && type == "Triangular") {
        EndPoint = "autoTradeOnOffTriangular";
      }
    } else {
      if (auth.userData?.autoTrade && type == "Direct") {
        EndPoint = "sniperBotOnOffDirectArb";
      }
      if (auth.userData?.autoTrade && type == "Intra") {
        EndPoint = "sniperBotOnOffIntraArbOnOf";
      }
      if (auth.userData?.autoTrade && type == "Loop") {
        EndPoint = "autoTradeOnOffLoop";
      }
      if (auth.userData?.autoTrade && type == "Triangular") {
        EndPoint = "sniperBotOnOffTriangular";
      }
    }
    try {
      const response = await dataPostHandler(EndPoint);
      if (response.status == 200) {
        setIsAutoTradeOn(false);
        setFiltersData({
          exchange1: [],
          exchange2: [],
          orderType: "",
        });
        setAutoTradeData({
          fromExchange: [],
          toExchange: [],
          toExchange1: [],
          capital: 0,
          threshold: 0,
          Minthreshold: 0,
          fromCoins: [],
          toCoins: [],
        });
        setisSubmit(false);
        auth.getProfileDataHandler(window.localStorage.getItem("token"));
        toast.success("Auto trade has been off successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TradeCheckBox>
      <Box>
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            Auto- Off/On
          </Typography>
          <Switch
            onClick={() => {
              if (isAutoTradeOn) {
                autoTradeOffAPIHandler();
              }
            }}
            checked={isAutoTradeOn}
            disabled={!isAutoTradeOn}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Box>

        <Box mt={2}>
          <Box mb={1}>
            <Typography variant="body2" color="primary">
              {type == "Direct"
                ? "Choose Your First Exchange"
                : "Choose Your Exchange"}
            </Typography>
          </Box>

          <Box
            style={{ width: "100%", position: "relative" }}
            className="autocompleBox"
          >
            <Autocomplete
              // className={classes.dropdown12}
              disabled={isAutoTradeOn}
              size="small"
              multiple
              limitTags={2}
              options={exchangeList.filter(function (x) {
                return (
                  filtersData.exchange1.filter(function (y) {
                    return y == x;
                  }).length == 0
                );
              })}
              value={filtersData?.exchange1}
              onChange={(e, v) => {
                setFiltersData({ ...filtersData, ["exchange1"]: v });
              }}
              renderInput={(params) => (
                <TextField
                  disabled={isAutoTradeOn}
                  {...params}
                  variant="outlined"
                  placeholder={
                    type == "Direct"
                      ? "Choose Your First Exchange"
                      : "Choose Your Exchange"
                  }
                  style={{ marginLeft: 0, marginRight: 0 }}
                />
              )}
            />
          </Box>
        </Box>
        {type == "Direct" && (
          <Box mt={2}>
            <Box mb={1}>
              <Typography variant="body2" color="primary">
                Choose Your Second Exchange
              </Typography>
            </Box>
            <Box
              style={{ width: "100%", position: "relative" }}
              className="autocompleBox"
            >
              <Autocomplete
                // className={classes.dropdown12}
                disabled={isAutoTradeOn}
                size="small"
                multiple
                limitTags={2}
                value={filtersData?.exchange2}
                options={exchangeList.filter(function (x) {
                  return (
                    filtersData.exchange2.filter(function (y) {
                      return y == x;
                    }).length == 0
                  );
                })}
                onChange={(e, v) => {
                  setFiltersData({ ...filtersData, ["exchange2"]: v });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={isAutoTradeOn}
                    variant="outlined"
                    placeholder="Choose Your Second Exchange"
                    style={{ marginLeft: 0, marginRight: 0 }}
                  />
                )}
              />
            </Box>
          </Box>
        )}
        <Box className="formBox">
          <Box mb={1} mt={1}>
            <Typography variant="body2" color="primary">
              Amount per Trade
            </Typography>
          </Box>

          <FormControl variant="outlined" fullWidth>
            <TextField
              name="capital"
              variant="outlined"
              type="number"
              value={autoTradeData?.capital}
              disabled={isAutoTradeOn}
              onChange={(e, v) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  setAutoTradeData({
                    fromExchange: autoTradeData.fromExchange,
                    toExchange: autoTradeData.toExchange,
                    toExchange1: autoTradeData.toExchange1,
                    capital: e.target.value,
                    threshold: autoTradeData.threshold,
                    Minthreshold: autoTradeData.Minthreshold,
                  });
                }
                setisSubmit(true);
              }}
              error={isSubmit && autoTradeData?.capital == ""}
              onKeyPress={(event) => {
                if (
                  event?.key === "-" ||
                  event?.key === "+" ||
                  event?.key === "*" ||
                  event?.key === "/"
                ) {
                  event.preventDefault();
                }
              }}
              onKeyDown={(event) => handleNegativeValue(event)}
            />
            <FormHelperText
              error
              // className={classes.helperText}
            >
              {isSubmit &&
              autoTradeData?.capital !== "" &&
              Number(autoTradeData?.capital) < 50
                ? "Capital should be 50 or greater than 50."
                : ""}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box className="formBox" mt={2} mb={2}>
          <Box mb={1}>
            <Typography variant="body2" color="primary">
              Minimum Profit (USDT)
            </Typography>
          </Box>

          <FormControl variant="outlined" fullWidth>
            <TextField
              variant="outlined"
              name="Minthreshold"
              type="number"
              value={autoTradeData?.Minthreshold}
              disabled={isAutoTradeOn}
              onChange={(e, v) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  setAutoTradeData({
                    fromExchange: autoTradeData.fromExchange,
                    toExchange: autoTradeData.toExchange,
                    toExchange1: autoTradeData.toExchange1,
                    capital: autoTradeData.capital,
                    Minthreshold: e.target.value,
                    threshold: autoTradeData.threshold,
                  });
                  if (e.target.value > 100) {
                    setIsValidThreshold(false);
                  } else {
                    setIsValidThreshold(true);
                  }
                }
              }}
              onKeyPress={(event) => {
                if (
                  event?.key === "-" ||
                  event?.key === "+" ||
                  event?.key === "*" ||
                  event?.key === "/"
                ) {
                  event.preventDefault();
                }
              }}
              onKeyDown={(event) => handleNegativeValue(event)}
            />
            {!isValidThreshold && autoTradeData.Minthreshold !== "" && (
              <FormHelperText error>Please enter valid value.</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* {type !== "Direct" && (
          <Box mt={2}>
            <Box mb={1}>
              <Typography variant="body2" color="primary">
                Order Type
              </Typography>
            </Box>
            <Box mb={2}>
              <Box
                style={{ width: "100%", position: "relative" }}
                className="autocompleBox"
              >
                <Autocomplete
                  // className={classes.dropdown12}

                  size="small"
                  value={filtersData?.orderType}
                  onChange={(event, value) => {
                    setFiltersData({
                      ...filtersData,
                      orderType: value,
                    });
                  }}
                  options={orderTypeData.map((option) => option.label)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select order type"
                      style={{ marginLeft: 0, marginRight: 0 }}
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        )} */}

        <Button
          className="modelbtn"
          color="primary"
          variant="contained"
          disabled={isAutoTradeOn}
          onClick={() => autoTradeConnectAPIHandler()}
        >
          Submit
        </Button>
        {isProcessing && <PageLoader />}
      </Box>
    </TradeCheckBox>
  );
}
