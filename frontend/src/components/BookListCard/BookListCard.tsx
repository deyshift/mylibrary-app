import React, { useState } from "react";
import { Book } from "../../types/book";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import the dropdown icon

interface BookListCardProps {
    book: Book;
    handleAddBook: (book: Book, status: string) => void;
}

const BookListCard: React.FC<BookListCardProps> = ({ book, handleAddBook }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>("Unread");

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status);
        handleAddBook(book, status); // Add the book with the selected status
        handleMenuClose();
    };

    return (
        <Box
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
            <Box sx={{ flex: 1, textAlign: "left" }}>
                <Typography variant="h5" color="text.primary" gutterBottom data-testid="title">
                    {book.title}
                </Typography>
                <Typography variant="body2" color="text.primary" gutterBottom data-testid="authors">
                    <strong>Authors:</strong> {book.authors.join(", ")}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMenuOpen}
                    sx={{ marginTop: "16px" }}
                    endIcon={<ArrowDropDownIcon />} // Use the Material-UI dropdown icon
                >
                    Add to Library
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        onMouseEnter: () => setAnchorEl(anchorEl), // Keep the menu open on hover
                        onMouseLeave: handleMenuClose, // Close the menu when the mouse leaves
                    }}
                    sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: "secondary.lighter", // Use an even lighter secondary color
                            color: "text.primary", // Use the primary text color for better contrast
                            minWidth: "140px", // Match the button width dynamically
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for visibility
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => handleStatusSelect("Read")}
                        sx={{
                            "&:hover": {
                                backgroundColor: "secondary.lightest", // Use a very light secondary color on hover
                            },
                        }}
                    >
                        Read
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleStatusSelect("Currently Reading")}
                        sx={{
                            "&:hover": {
                                backgroundColor: "secondary.lightest", // Use a very light secondary color on hover
                            },
                        }}
                    >
                        Currently Reading
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleStatusSelect("Unread")}
                        sx={{
                            "&:hover": {
                                backgroundColor: "secondary.lightest", // Use a very light secondary color on hover
                            },
                        }}
                    >
                        Unread
                    </MenuItem>
                </Menu>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ marginTop: "16px" }}
                    data-testid="description"
                >
                    <strong>Description:</strong> {book.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default BookListCard;