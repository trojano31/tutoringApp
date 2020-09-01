import React from "react";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Link from "@material-ui/core/Link";

const CopryrightText = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Learny</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const Copyright = () => {
  return (
    <Box pt={4}>
      <CopryrightText />
    </Box>
  );
};
