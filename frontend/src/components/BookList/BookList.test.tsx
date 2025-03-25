import { render, screen, fireEvent } from "@testing-library/react";
import BookList from "./BookList";
import "@testing-library/jest-dom";

const mockBooks = [
  {
    isbn: "978-3-16-148410-0",
    title: "Book One",
    authors: ["Author A", "Author B"],
    description: "This is the description for Book One.",
    cover_art: "https://via.placeholder.com/140x200",
  },
  {
    isbn: "978-1-23-456789-7",
    title: "Book Two",
    authors: ["Author C"],
    description: "This is the description for Book Two.",
    cover_art: "https://via.placeholder.com/140x200",
  },
];

const mockHandleAddBook = jest.fn();

describe("BookList Component", () => {
  it("renders the correct number of BookListCard components", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);

    // Check that the correct number of BookListCard components are rendered
    const bookCards = screen.getAllByTestId("book-list-card");
    expect(bookCards).toHaveLength(mockBooks.length);
  });

  it("displays the correct book titles", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);

    // Get all elements with the data-testid "book-title"
    const titleElements = screen.getAllByTestId("book-title");

    // Check that the number of titles matches the number of books
    expect(titleElements).toHaveLength(mockBooks.length);

    // Verify that each title matches the corresponding book
    mockBooks.forEach((book, index) => {
      expect(titleElements[index]).toHaveTextContent(book.title);
    });
  });

  it("calls handleAddBook when a status is selected in a BookListCard", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);

    // Open the dropdown menu for the first book
    const addButton = screen.getAllByTestId("add-to-library-button")[0];
    fireEvent.click(addButton);

    // Select the "Read" status
    const readMenuItem = screen.getByTestId("status-option-read");
    fireEvent.click(readMenuItem);

    // Check that handleAddBook was called with the correct arguments
    expect(mockHandleAddBook).toHaveBeenCalledTimes(1);
    expect(mockHandleAddBook).toHaveBeenCalledWith(mockBooks[0], "Read");
  });
});