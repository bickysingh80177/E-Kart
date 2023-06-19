import React from "react";
import { Typography } from "@mui/material";

import "./NotAuthorized.css";

const NotAuthorized = () => {
  return (
    <div className="errorContainer">
      <div>
        <h2>Sorry! you cannot access this page</h2>
      </div>
    </div>
  );
};

export default NotAuthorized;
