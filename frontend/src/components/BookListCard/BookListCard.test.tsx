import { render, screen, fireEvent } from "@testing-library/react";
import BookListCard from "./BookListCard";
import "@testing-library/jest-dom";

const mockBook = {
  isbn: "978-3-16-148410-0",
  title: "Book One",
  authors: ["Author A", "Author B"],
  description: "This is the description for Book One.",
  cover_art: "https://via.placeholder.com/140x200",
};

const mockHandleAddBook = jest.fn();

describe("BookListCard Component", () => {
  it("renders the book details correctly", () => {
    render(<BookListCard book={mockBook} handleAddBook={mockHandleAddBook} />);

    // Check that the title is rendered
    const titleElement = screen.getByTestId("book-title");
    expect(titleElement).toHaveTextContent(mockBook.title);

    // Check that the authors are rendered
    const authorsElement = screen.getByTestId("book-authors");
    expect(authorsElement).toHaveTextContent(`Authors: ${mockBook.authors.join(", ")}`);

    // Check that the description is rendered
    const descriptionElement = screen.getByTestId("book-description");
    expect(descriptionElement).toHaveTextContent(mockBook.description);

    // Check that the cover image is rendered
    const coverImage = screen.getByTestId("book-cover");
    expect(coverImage).toHaveAttribute("src", mockBook.cover_art);
  });

  it("renders a placeholder image if no cover_art is provided", () => {
    const bookWithoutCover = { ...mockBook, cover_art: "" };
    render(<BookListCard book={bookWithoutCover} handleAddBook={mockHandleAddBook} />);

    // Check that the placeholder image is rendered
    const placeholderImage = screen.getByTestId("book-cover");
    expect(placeholderImage).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("opens the dropdown menu when 'Add to Library' is clicked", () => {
    render(<BookListCard book={mockBook} handleAddBook={mockHandleAddBook} />);

    // Click the "Add to Library" button
    const addButton = screen.getByTestId("add-to-library-button");
    fireEvent.click(addButton);

    // Check that the dropdown menu is displayed
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(3); // "Read", "Currently Reading", "Unread"
  });

  it("calls handleAddBook with the correct status when a menu item is clicked", () => {
    render(<BookListCard book={mockBook} handleAddBook={mockHandleAddBook} />);

    // Open the dropdown menu
    const addButton = screen.getByTestId("add-to-library-button");
    fireEvent.click(addButton);

    // Click the "Read" menu item
    const readMenuItem = screen.getByTestId("status-option-read");
    fireEvent.click(readMenuItem);

    // Check that handleAddBook was called with the correct arguments
    expect(mockHandleAddBook).toHaveBeenCalledTimes(1);
    expect(mockHandleAddBook).toHaveBeenCalledWith(mockBook, "Read");
  });

  it("displays 'Unknown Author' if no authors are provided", () => {
    const bookWithoutAuthors = { ...mockBook, authors: [] };
    render(<BookListCard book={bookWithoutAuthors} handleAddBook={mockHandleAddBook} />);

    // Check that "Unknown Author" is displayed
    const authorsElement = screen.getByTestId("book-authors");
    expect(authorsElement).toHaveTextContent("Authors: Unknown Author");
  });
});