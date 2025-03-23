import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, handleSearch }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      <Box sx={{ width: "100%", maxWidth: "1200px" }}> {/* Constrain the width */}
        <form
          role="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // Trigger search on form submission
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search for books by title, keyword, or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth // Keep fullWidth for responsiveness within the constrained container
          />
        </form>
      </Box>
    </Box>
  );
};

export default SearchBar;