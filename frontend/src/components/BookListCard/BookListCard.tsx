import React, { useState } from "react";
import { BookListCardProps } from "../../types/props";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AuthorInfo from "../AuthorInfo/AuthorInfo"; // Import the AuthorInfo component

const BookListCard: React.FC<BookListCardProps> = ({ book, handleAddBook, isInLibrary }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleStatusSelect = (status: string) => {
      handleAddBook(book, status); // Pass the selected status to the parent handler
      handleMenuClose();
    };
  
    const handleAuthorClick = (authorName: string) => {
      setSelectedAuthor(authorName);
      setIsAuthorModalOpen(true);
    };
  
    return (
      <>
        <Box
          data-testid="book-list-card"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "flex-start",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "background.paper",
          }}
        >
          {/* Cover Art */}
          {book.cover_art ? (
            <Box
              component="img"
              src={book.cover_art}
              alt={`${book.title} cover`}
              data-testid="book-cover"
              sx={{
                width: "140px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          ) : (
            <Box
              component="img"
              src="/placeholder.jpg" // Path to your placeholder image
              alt="No Cover Art Available"
              data-testid="book-cover"
              sx={{
                width: "140px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
  
          {/* Book Details */}
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h5" color="text.primary" gutterBottom data-testid="book-title">
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.primary" gutterBottom data-testid="book-authors">
              <strong>Authors:</strong>{" "}
              {book.authors.length > 0 ? (
                book.authors.map((author, index) => (
                  <React.Fragment key={author}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAuthorClick(author);
                      }}
                      style={{ color: "#8B0000", textDecoration: "underline", cursor: "pointer" }}
                    >
                      {author}
                    </a>
                    {index < book.authors.length - 1 && ", "}
                  </React.Fragment>
                ))
              ) : (
                "Unknown Author"
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary" // Change color if the book is in the library
              onClick={handleMenuOpen}
              sx={{ marginTop: "16px" }}
              endIcon={<ArrowDropDownIcon />}
              data-testid="add-to-library-button"
            >
              {isInLibrary ? "Book is In Library" : "Add to Library"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              data-testid="status-menu"
            >
              {["Read", "Currently Reading", "Unread"].map((status) => (
                <MenuItem
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  data-testid={`status-option-${status.toLowerCase().replace(" ", "-")}`}
                >
                  {status}
                </MenuItem>
              ))}
            </Menu>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ marginTop: "16px" }}
              data-testid="book-description"
            >
              <strong>Description:</strong> {book.description}
            </Typography>
          </Box>
        </Box>
  
        {/* Author Info Modal */}
        <AuthorInfo
          isOpen={isAuthorModalOpen}
          onClose={() => setIsAuthorModalOpen(false)}
          authorName={selectedAuthor}
        />
      </>
    );
  };

export default BookListCard;