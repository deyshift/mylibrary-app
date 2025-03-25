import React from "react";
import { Box } from "@mui/material";
import { LibraryCarouselProps } from "../../types/props";
import BookCard from "../BookCard/BookCard";
import CarouselControls from "../CarouselControls/CarouselControls";

const LibraryCarousel: React.FC<LibraryCarouselProps> = ({ books }) => {
  const scrollLeft = () => {
    const container = document.querySelector(".carousel-container");
    if (container) {
      const scrollAmount = container.clientWidth; // Scroll by the visible width of the container
      container.scrollLeft -= scrollAmount; // Update the container's scroll position
    }
  };

  const scrollRight = () => {
    const container = document.querySelector(".carousel-container");
    if (container) {
      const scrollAmount = container.clientWidth; // Scroll by the visible width of the container
      container.scrollLeft += scrollAmount; // Update the container's scroll position
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
      {/* Carousel Container */}
      <Box
        className="carousel-container"
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth", // Enables smooth scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in WebKit-based browsers
          },
          scrollbarWidth: "none", // Hides the scrollbar in Firefox
        }}
      >
        {books.map((book) => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </Box>

      {/* Buttons Below the Carousel */}
      <CarouselControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />
    </Box>
  );
};

export default LibraryCarousel;