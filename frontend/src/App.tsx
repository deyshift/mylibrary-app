import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import { Book } from "./types/book";
import LibraryCarousel from "./components/LibraryCarousel/LibraryCarousel";
import AlphabetNav from "./components/AlphabetNav/AlphabetNav";
import { groupBooksByRange } from "./utils/groupBooksByRange"; // Import the utility function
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import { getBooks, searchBooks, addBook } from "./services/api/apiService";
import QuoteOfTheDay from "./components/QuoteOfTheDay/QuoteOfTheDay";
import SearchBar from "./components/SearchBar/SearchBar";
import BookList from "./components/BookList/BookList";
import BookInfo from "./components/BookInfo/BookInfo"; // Import the new BookInfo component

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchMode, setSearchMode] = useState<"library" | "api">("api"); // Tabs state
  const resultsPerPage = 10;

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Refs for each range

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await getBooks();
        setLibrary(data);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    fetchLibrary();
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Update the status of a book in the library
  const handleUpdateStatus = (status: string) => {
    if (selectedBook) {
      // Update the status in the library state
      setLibrary((prevLibrary) =>
        prevLibrary.map((book) =>
          book.title === selectedBook.title ? { ...book, status } : book
        )
      );

      // Update the selectedBook's status to reflect the change in the modal
      setSelectedBook((prevBook) =>
        prevBook ? { ...prevBook, status } : null
      );
    }
  };

  // Group books into alphabet ranges using the utility function
  const groupedBooks = useMemo(() => {
    const grouped = groupBooksByRange(library);
    return grouped;
  }, [library]);

  const handleRangeClick = (range: string) => {
    const section = bookRefs.current[range];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }
  
    if (searchMode === "library") {
      // Search for the matching book in the library
      const matchingBook = library.find(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          (book.authors && book.authors.some((author) => author.toLowerCase().includes(query.toLowerCase())))
      );
  
      if (matchingBook) {
        // Scroll directly to the matching book
        const bookRef = bookRefs.current[matchingBook.title];
        if (bookRef) {
          bookRef.scrollIntoView({ behavior: "smooth", block: "center" });
        }
  
        // Open the modal for the matching book
        handleBookClick(matchingBook);
      } else {
        alert("No matching book found in your library.");
      }
    } else {
      // Search in the API
      try {
        const data = await searchBooks(query);
        setResults(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  };

  const handleAddBook = async (book: Book, status: string) => {
    try {
      const data = await addBook(book, status);
      alert(data.message);

      // Refresh the library after adding a book
      const updatedLibrary = await getBooks();
      setLibrary(updatedLibrary);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book to library. Please try again.");
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
      <QuoteOfTheDay />
      <Box className="App">
        <h2>Browse Your Shelves</h2>
        {library.length > 0 ? (
          <>
            {/* Conditionally render AlphabetNav only if there are more than 50 books */}
            {library.length > 50 && (
              <AlphabetNav ranges={Object.keys(groupedBooks)} onRangeClick={handleRangeClick} />
            )}
            {/* Library Carousel */}
            <LibraryCarousel 
              books={library} 
              bookRefs={bookRefs} 
              groupedBooks={groupedBooks}
              onBookClick={handleBookClick}
            />
            {selectedBook && (
              <BookInfo
                open={isModalOpen}
                onClose={handleCloseModal}
                book={selectedBook} // Pass the entire book object
                onUpdateStatus={handleUpdateStatus} // Pass the handler to update status
              />
            )}
          </>
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
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
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