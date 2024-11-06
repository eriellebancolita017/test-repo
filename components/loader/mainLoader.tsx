import { Box, LinearProgress } from "@mui/material";
import React from "react";

export const MainLoader = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box sx={{ bgcolor: "white", width: "100%" }}>
      <LinearProgress
        value={progress}
        sx={{
          "--LinearProgress-radius": "0px",
          "--LinearProgress-progressThickness": "24px",
          boxShadow: "sm",
          borderColor: "neutral.500",
          height: "5px",
        }}
      ></LinearProgress>
    </Box>
  );
};
