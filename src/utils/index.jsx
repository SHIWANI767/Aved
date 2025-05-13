import { ApiConfig } from "@/api-services";
import axios from "axios";
export const maxCapitalsLimit = 10000000000000;

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};

export function handleTrim(value, max = 16) {
  const sortValue = `${value?.slice(0, max)}${
    value?.length > max ? "..." : ""
  }`;
  return sortValue;
}
export function camelToTitle(str) {
  return str
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, function (match) {
      return match.toUpperCase();
    }); // Capitalize the first letter
}
export const exportToCSV = (array, filename) => {
  if (array.length === 0) {
    console.error("Array is empty.");
    return;
  }

  // Extract headers from the keys of the first object
  const headers = Object.keys(array[0]);

  // Convert the array to CSV
  const csvRows = [];

  // Add the headers
  csvRows.push(headers.join(","));

  // Add the data rows
  for (const obj of array) {
    const values = headers.map((header) => {
      const value = obj[header] === undefined ? "" : obj[header];
      const escaped = ("" + value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  // Create a Blob from the CSV string
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\..+/, "");
  const fullFilename = `${filename}_${timestamp}.csv`;
  // Create a link to download the Blob as a file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fullFilename;

  // Append the link to the body and trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export function checkNumber(value) {
  // const re = /^(?!0+$)[0-9]{1,10}$/gm;
  // return re.test(value);
  const re = /^[1-9][0-9]{9}$/;
  return re.test(value);
}
export const getCoinImageDatahandler = async (token) => {
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig.get_wallet_coinImageData,
    });
    if (res.data.responseCode === 200) {
      return res?.data?.result;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export function fixDecimal(number) {
  if (number == 100) {
  }

  const zeroCount = countZerosAfterDecimal(number);

  if (zeroCount === 0 && number === Math.floor(number)) {
    return number.toString();
  } else if (zeroCount === 0 || number >= 1) {
    return parseFloat(number).toFixed(4);
  } else if (number < 1) {
    return parseFloat(number)
      .toFixed(zeroCount + 2)
      .toString();
  }
}

export function countZerosAfterDecimal(number) {
  const numString = number.toString();
  const decimalIndex = numString.indexOf(".");
  if (decimalIndex === -1) {
    return 0;
  }

  let zeroCount = 0;
  for (let i = decimalIndex + 1; i < numString.length; i++) {
    if (numString[i] === "0") {
      zeroCount++;
    } else {
      break;
    }
  }
  return zeroCount;
}

export const handleNegativeValue = (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
  }
  // const {
  //   key,
  //   target: { value, selectionStart },
  // } = event;
  // const newValue =
  //   value?.slice(0, selectionStart) + value?.slice(selectionStart + 1);
  // const parsedValue = parseFloat(newValue);
  // console.log(" ----- parsedValue ", parsedValue);
  // if (
  //   ["ArrowUp", "ArrowDown", "-"].includes(key) &&
  //   (key === "-" || isNaN(parsedValue) || parsedValue < 0)
  // ) {
  //   event.preventDefault();
  // }
};
export function funConEx(value) {
  // function coinImageEx(value) {
  let newArray = [];
  for (let i = 0; i < value?.length; i++) {
    for (let j = 0; j < ExchangeArray?.length; j++) {
      if (
        value[i]?.exchangeName.toLowerCase() ==
        ExchangeArray[j]?.coinName.toLowerCase()
      ) {
        newArray.push({ ...value[i], img: ExchangeArray[j]?.img });
      }
    }
  }
  return newArray;
}

export function sortAddress(add) {
  const sortAdd = `${add?.slice(0, 4)}...${add?.slice(add.length - 4)}`;
  return sortAdd;
}
export function sortAddressStart(add) {
  const sortAdd = `${add?.slice(0, 8)}${add.length > 8 ? "..." : ""}`;
  return sortAdd;
}
export function sortAddressWalletDeposite(add) {
  const sortAdd = `${add?.slice(0, 40)}...${add?.slice(add?.length - 4)}`;
  return sortAdd;
}
export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string?.slice(1);
}
export function ReplaceDash(value, w) {
  return value.replace(/-/g, w);
}

export const setCryptoDecimals = (amt) => {
  amt = exponentialToDecimal(amt || 0);

  amt = amt?.replace(",", "");
  let arr = amt?.toString().split(".");

  if (arr.length > 1) {
    if (arr[1].length > 8) {
      return numberWithCommas(
        // exponentialToDecimal(parseFloat(amt).toFixed(8)).toString(),
        exponentialToDecimal(parseFloat(amt)).toString()
      ).toString();
    } else {
      return numberWithCommas(amt).toString();
    }
  } else {
    if (amt) {
      return numberWithCommas(amt).toString();
    }
    return "0";
  }
};

const numberWithCommas = (x) => {
  let str = toFixedFunction(x, 8);

  let arr = str.split(".");

  let numbers = arr[0];
  let decimalNum = "";
  if (arr.length > 1) {
    decimalNum = arr[1];
    return `${numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalNum}`;
  } else {
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
export const toFixedFunction = (amt, decimals) => {
  let str = amt?.toString();
  if (str?.includes(".")) {
    str = str?.slice(0, str.indexOf(".") + (decimals + 1));
  }
  return str;
};
export const exponentialToDecimal = (exponential) => {
  let decimal = exponential?.toString()?.toLowerCase();
  if (decimal?.includes("e+")) {
    const exponentialSplitted = decimal?.split("e+");
    let postfix = "";
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes(".")
          ? exponentialSplitted[0].split(".")[1].length
          : 0);
      i++
    ) {
      postfix += "0";
    }
    const addCommas = (text) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text?.slice(0, textLength - j)},${text?.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal?.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal?.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};
//function to generate unique avatar of the registered user
export function generateUniqueAvatar(value) {
  return `https://avatars.dicebear.com/api/identicon/${value}.svg`;
}
export function isValidFacebookUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?facebook\.com(?:\/[a-zA-Z0-9_\-\.]+)?$/;
  return re.test(value);
}
export function isValidTwitterUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?twitter\.com(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export function isValidInstagramUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?instagram\.com(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export function isValidDiscordUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?discord\.gg(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export const currencyFormatter = (value) => {
  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(value);
};
export const ExchangeArray = [
  { img: "/images/ExchangeLogo/kraken.png", coinName: "Kraken" },
  { img: "/images/ExchangeLogo/binance.jpg", coinName: "Binance" },
  { img: "/images/ExchangeLogo/Mexc.png", coinName: "Mexc" },
  { img: "/images/ExchangeLogo/Bitmart.jpg", coinName: "Bitmart" },
  { img: "/images/ExchangeLogo/gemini.png", coinName: "Gemini" },
  { img: "/images/ExchangeLogo/coinbasepro.png", coinName: "Coinbasepro" },
];
export const ExchangeLogo = [
  {
    img: "/images/ExchangeLogo/binance.jpg",
    title: "binance",
  },
  {
    img: "/images/ExchangeLogo/bitstamp.png",
    title: "bitstamp",
  },
  {
    img: "/images/ExchangeLogo/Mexc.png",
    title: "Mexc",
  },
  {
    img: "/images/ExchangeLogo/Bitmart.png",
    title: "Bitmart",
  },
  {
    img: "/images/ExchangeLogo/cryptocom.png",
    title: "cryptocom",
  },
  {
    img: "/images/ExchangeLogo/ftxus.png",
    title: "ftxus",
  },
  {
    img: "/images/ExchangeLogo/gemini.png",
    title: "gemini",
  },
  {
    img: "/images/ExchangeLogo/cexio.png",
    title: "cexio",
  },
  {
    img: "/images/ExchangeLogo/huobi.png",
    title: "huobi",
  },
  {
    img: "/images/ExchangeLogo/kraken.png",
    title: "kraken",
  },
  {
    img: "/images/ExchangeLogo/kucoin.png",
    title: "kucoin",
  },
];
export function countDecimalPlaces(number) {
  const decimalString = number.toString().split(".")[1];
  return decimalString ? decimalString.length : 0;
}
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options); // "12 Jan 2023"
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Set to false if you want 24-hour format
  };
  return date.toLocaleString("en-GB", options); // Example: "12 Jan 2023, 03:45 PM"
};

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import countries from "world-countries";

export const getDeviceId = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // Unique device ID
};

const DEFAULT_FLAG_URL = "/images/globe.png"; // Default placeholder flag

export const CountryFlag = ({ countryName }) => {
  const country = countries.find((c) => c.name.common === countryName);
  const countryCode = country ? country.cca2 : null;
  const flagUrl = countryCode
    ? `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`
    : DEFAULT_FLAG_URL;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={flagUrl}
        alt={`${countryName} flag`}
        height={"15px"}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};
export const toLowerCase = (status) => {
  return status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase();
};
