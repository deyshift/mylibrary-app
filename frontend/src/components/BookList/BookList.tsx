import React from "react";
import { Book } from "../../types/book";
import Box from "@mui/material/Box";
import BookListCard from "../BookListCard/BookListCard";

interface BookListProps {
  books: Book[];
  handleAddBook: (book: Book, status: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, handleAddBook }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
      {books.map((book, index) => (
        <BookListCard key={index} book={book} handleAddBook={handleAddBook} />
      ))}
    </Box>
  );
};

export default BookList;