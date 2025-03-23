import { useState } from "react";
import "./App.css";
import { Book } from "./types/book";
import BookList from "./components/BookList/BookList";
import SearchBar from "./components/SearchBar/SearchBar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme"; // Import your custom Material-UI theme
import { Box } from "@mui/material";
import Button from "@mui/material/Button"; // Import Material-UI Button

function App() {
  const [query, setQuery] = useState<string>(""); // Query is a string
  const [results, setResults] = useState<Book[]>([]); // Results is an array of Book objects
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const resultsPerPage = 10; // Number of results per page

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/search_books?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data: Book[] = await response.json(); // Expecting an array of Book objects
      setResults(data); // Store all results
      setCurrentPage(1); // Reset to the first page on a new search
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Error fetching books. Please try again later.");
    }
  };

  const handleAddBook = async (book: Book) => { // Accepts a Book object
    try {
      const response = await fetch("http://127.0.0.1:5000/api/add_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error("Failed to add book to library");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book. Please try again later.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

  // Calculate the books to display for the current page
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <Box className="App">
        <h1>Search for Books</h1>
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
        <BookList books={paginatedResults} handleAddBook={handleAddBook} />
        {/* Only show pagination controls if there are more than 10 results */}
        {results.length > resultsPerPage && (
          <Box>
            {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={index + 1 === currentPage ? "contained" : "outlined"}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;