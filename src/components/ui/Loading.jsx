import React from "react";
import { CircularProgress } from "@mui/material";
import { gTheme } from "../../theme/globalTheme";

export const Loading = () => {
  return <CircularProgress sx={{ padding: 1, color: gTheme.color.primary }} />;
};
