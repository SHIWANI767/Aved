// SortAddress.js
import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { IconButton } from "@mui/material";
import { sortAddress } from ".";
import { Check } from "@mui/icons-material";
import toast from "react-hot-toast";

const SortAddress = ({ address }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = (address) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>{sortAddress(address)}</span>
      <IconButton
        onClick={handleCopyClick}
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          border: "none",
          background: "transparent",
        }}
        disabled={copied}
      >
        {copied ? <Check /> : <LuCopy />}
      </IconButton>
    </div>
  );
};

export default SortAddress;
