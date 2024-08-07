import { Box, Typography } from "@mui/material";
import React from "react";

const blend = (
  [r1, g1, b1]: number[],
  [r2, g2, b2]: number[],
  ratio: number,
) => [
  r1 * (1 - ratio) + r2 * ratio,
  g1 * (1 - ratio) + g2 * ratio,
  b1 * (1 - ratio) + b2 * ratio,
];

type UsageBarProps = {
  percent: number;
  text: string;
};

const UsageBar: React.FC<UsageBarProps> = ({ percent, text }) => {
  const safePercent = Math.max(Math.min(percent, 100), 0);
  const minColor = [0, 255, 0];
  const maxColor = [255, 0, 0];

  const leftColor = minColor;
  const rightColor = blend(minColor, maxColor, safePercent / 100);
  const alpha = 0.2;

  const gradient = `
    linear-gradient(
      to right,
      rgba(${leftColor.join(",")}, ${alpha}) 0%,
      rgba(${rightColor.join(",")}, ${alpha}) ${safePercent}%,
      transparent ${safePercent}%
    )
  `;

  // Use a nested `span` here because the right border is affected by the
  // gradient background otherwise.
  return (
    <Box
      component="span"
      sx={{
        borderColor: (theme) => theme.palette.divider,
        borderStyle: "solid",
        borderWidth: 1,
        display: "flex",
        flexGrow: 1,
      }}
    >
      <Box
        component="span"
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          background: gradient,
          flexGrow: 1,
        }}
      >
        <Typography align="center">{text}</Typography>
      </Box>
    </Box>
  );
};

export default UsageBar;
