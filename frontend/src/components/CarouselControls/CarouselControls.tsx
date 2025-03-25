import React from "react";
import { Box, Button } from "@mui/material";
import { CarouselControlsProps } from "../../types/props";


const CarouselControls: React.FC<CarouselControlsProps> = ({ onScrollLeft, onScrollRight }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center the buttons
        gap: "20px", // Add spacing between the buttons
        marginTop: "10px", // Add spacing between the carousel and the buttons
      }}
    >
      <Button
        onClick={onScrollLeft}
        sx={{
          backgroundColor: "white", // Optional: Add a background to make it stand out
          boxShadow: 2, // Optional: Add a shadow for better visibility
        }}
      >
        {"<"}
      </Button>
      <Button
        onClick={onScrollRight}
        sx={{
          backgroundColor: "white", // Optional: Add a background to make it stand out
          boxShadow: 2, // Optional: Add a shadow for better visibility
        }}
      >
        {">"}
      </Button>
    </Box>
  );
};

export default CarouselControls;