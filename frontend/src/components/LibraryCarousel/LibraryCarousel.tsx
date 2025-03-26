import React from "react";
import { Box } from "@mui/material";
import { LibraryCarouselProps } from "../../types/props";
import BookCard from "../BookCard/BookCard";
import CarouselControls from "../CarouselControls/CarouselControls";

const LibraryCarousel: React.FC<LibraryCarouselProps> = ({ books, bookRefs, groupedBooks, onBookClick }) => {
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
        {books.map((book) => {
          // Assign refs for the first book in each range
          const range = Object.keys(groupedBooks).find((key) =>
            groupedBooks[key].includes(book)
          );

          return (
            <Box
              key={book.isbn}
              ref={(el) => {
                if (range && !bookRefs.current[range] && el instanceof HTMLDivElement) {
                  bookRefs.current[range] = el; // Assign ref to the first book in the range
                }
              }}
              onClick={() => onBookClick(book)} // Handle book click
              sx={{ cursor: "pointer" }} // Add pointer cursor for clickable books
            >
              <BookCard book={book} />
            </Box>
          );
        })}
      </Box>

      {/* Buttons Below the Carousel */}
      <CarouselControls onScrollLeft={scrollLeft} onScrollRight={scrollRight} />
    </Box>
  );
};

export default LibraryCarousel;