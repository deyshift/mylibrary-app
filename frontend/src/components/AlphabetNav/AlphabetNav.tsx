import React from "react";
import { Box, Button } from "@mui/material";

interface AlphabetNavProps {
  ranges: string[]; // Alphabet ranges (e.g., "A-G", "H-N")
  onRangeClick: (range: string) => void;
}

const AlphabetNav: React.FC<AlphabetNavProps> = ({ ranges, onRangeClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
      {ranges.map((range) => (
        <Button
          key={range}
          variant="outlined"
          size="small"
          onClick={() => onRangeClick(range)} // Calls handleRangeClick with the range
        >
          {range}
        </Button>
      ))}
    </Box>
  );
};

export default AlphabetNav;