import React from "react";
import { BookListProps } from "../../types/props";
import Box from "@mui/material/Box";
import BookListCard from "../BookListCard/BookListCard";


const BookList: React.FC<BookListProps> = ({ books, handleAddBook }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}
      data-testid="book-list"
    >
      {books.map((book, index) => (
        <BookListCard
          key={index}
          book={book}
          handleAddBook={handleAddBook}
          isInLibrary={book.isInLibrary} // Pass the isInLibrary flag to BookListCard
          data-testid={`book-list-card-${index}`}
        />
      ))}
    </Box>
  );
};

export default BookList;