import React from "react";
import { Book } from "../../types/book";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface BookListProps {
  books: Book[];
  handleAddBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, handleAddBook }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
      {books.map((book, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "flex-start",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
          }}
        >
          {/* Cover Art */}
          {book.cover_art !== "No Cover Art Available" && (
            <Box
              component="img"
              src={book.cover_art}
              alt={`${book.title} cover`}
              sx={{
                width: "140px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}

          {/* Book Details */}
          <Box sx={{ flex: 1, textAlign: "left" }}> {/* Explicitly set textAlign to left */}
            <Typography variant="h5" component="div" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.primary" gutterBottom>
              <strong>Authors:</strong> {book.authors}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ marginBottom: "16px" }}>
              <strong>Description:</strong> {book.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddBook(book)}
            >
              Add to Library
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BookList;