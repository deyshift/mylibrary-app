import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Book } from "../../types/book";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card
      sx={{
        width: 150, // Match the width of the cover_art thumbnail
        height: 260, // Adjust height to fit cover_art and content
        margin: 1,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={book.cover_art || "/placeholder.jpg"}
        alt={book.title}
        sx={{
          width: "150px", // Ensures the image spans the full width of the card
          height: "200px", // Fixed height for the cover_art
          objectFit: "fill", // Ensures the entire thumbnail is visible without cropping
        }}
      />
      <CardContent
        sx={{
          height: "60px", // Adjusted height for the content area
          textAlign: "center", // Center-align the text
          padding: 1,
        }}
      >
        <Typography variant="subtitle1" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {book.authors || "Unknown Author"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;