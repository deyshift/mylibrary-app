import { useState, useEffect } from "react";
import "./App.css";
import { Book } from "./types/book";
import BookList from "./components/BookList/BookList";
import SearchBar from "./components/SearchBar/SearchBar";
import LibraryCarousel from "./components/LibraryCarousel/LibraryCarousel";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import { Box, Button, Typography, Tabs, Tab } from "@mui/material";

function App() {
  const API_URL = import.meta.env.VITE_API_URL || "";
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchMode, setSearchMode] = useState<"library" | "api">("library"); // Tabs state
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(`${API_URL}/api/get_books`);
        if (!response.ok) {
          throw new Error("Failed to fetch library");
        }
        const data: Book[] = await response.json();
        setLibrary(data);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    fetchLibrary();
  }, [API_URL]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }

    if (searchMode === "library") {
      // Search in the library
      const filteredResults = library.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          (book.authors && book.authors.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filteredResults);
    } else {
      // Search in the API
      try {
        const response = await fetch(`${API_URL}/search_books?query=${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data: Book[] = await response.json();
        setResults(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Error fetching books. Please try again later.");
      }
    }
  };

  const handleAddBook = async (book: Book) => {
    try {
      const response = await fetch(`${API_URL}/api/add_book`, {
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

      // Refresh the library after adding a book
      setLibrary((prevLibrary) => [...prevLibrary, book]);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book. Please try again later.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <h1>My Library</h1>
        {library.length > 0 ? (
          <LibraryCarousel books={library} />
        ) : (
          <Typography>No books in your library yet.</Typography>
        )}

        {/* Tabs for Search Modes */}
        <Tabs
          value={searchMode}
          onChange={(_, newValue) => setSearchMode(newValue)}
          centered
        >
          <Tab label="Search Library" value="library" />
          <Tab label="Find New Books" value="api" />
        </Tabs>

        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />

        {results.length > 0 && (
          <>
            <BookList books={paginatedResults} handleAddBook={handleAddBook} />
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
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;