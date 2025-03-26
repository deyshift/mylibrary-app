import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoModal from "../InfoModal/InfoModal";
import { BookInfoProps } from "../../types/props";
import { updateBookStatus } from "../../services/api/apiService";

const BookInfo: React.FC<BookInfoProps> = ({
    open,
    onClose,
    book,
    onUpdateStatus,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleStatusChange = async (status: string) => {
        if (onUpdateStatus) {
            onUpdateStatus(status); // Update the status in the frontend state
        }

        try {
            const data = await updateBookStatus(book.title, status); // Use the centralized API service
            console.log(data.message); // Log success message from the backend
        } catch (error) {
            console.error("Error updating book status:", error);
        } finally {
            handleMenuClose(); // Close the dropdown menu
        }
    };

    return (
        <InfoModal open={open} onClose={onClose}>
            <Box>
                {/* Cover Art */}
                {book.cover_art && (
                    <Box
                        component="img"
                        src={book.cover_art}
                        alt="Cover Art"
                        sx={{
                            width: "140px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            float: "left",
                            marginRight: 2,
                        }}
                    />
                )}

                {/* Title */}
                {book.title && (
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 700 }}
                    >
                        {book.title}
                    </Typography>
                )}

                {/* Author */}
                {book.authors && (
                    <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", marginBottom: 1 }}
                    >
                        <strong>Author:</strong> {book.authors.join(", ")}
                    </Typography>
                )}

                {/* Status Button */}
                {book.status && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleMenuOpen}
                        sx={{
                            marginBottom: 2,
                        }}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1).toLowerCase()}
                    </Button>
                )}

                {/* Dropdown Menu for Status Button */}
                {book.status && (
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleStatusChange("Unread")}>Unread</MenuItem>
                        <MenuItem onClick={() => handleStatusChange("Currently Reading")}>
                            Currently Reading
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusChange("Read")}>Read</MenuItem>
                    </Menu>
                )}

                {/* Description */}
                <Typography
                    id="modal-description"
                    variant="body2"
                    sx={{
                        textAlign: "justify",
                    }}
                >
                    {book.description || "No description available."}
                </Typography>
            </Box>
        </InfoModal>
    );
};

export default BookInfo;