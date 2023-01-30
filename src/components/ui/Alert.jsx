import React from "react";
import { Alert } from "@mui/material";

export const AlertView = ({ type, message }) => {
  return (
    <Alert severity={type} sx={{ width: "100%" }}>
      {message}
    </Alert>
  );
};
