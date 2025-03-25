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
  it("renders the correct number of books", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);

    // Check that the correct number of books is rendered
    const bookItems = screen.getAllByRole("img", { name: /cover$/i });
    expect(bookItems).toHaveLength(mockBooks.length);
  });

  it("displays the correct book details", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);
  
    // Get all titles, authors, and descriptions
    const titleElements = screen.getAllByTestId("title");
    const authorsElements = screen.getAllByTestId("authors");
    const descriptionElements = screen.getAllByTestId("description");
  
    mockBooks.forEach((book, index) => {
      // Check the title
      expect(titleElements[index]).toHaveTextContent(book.title);
  
      // Check the authors
      expect(authorsElements[index]).toHaveTextContent(`Authors: ${book.authors.join(", ")}`);
  
      // Check the description
      expect(descriptionElements[index]).toHaveTextContent(`Description: ${book.description}`);
    });
  });
  
  it("calls handleAddBook when the 'Add to Library' button is clicked", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);
  
    // Get all "Add to Library" buttons
    const addButtons = screen.getAllByTestId("add-button");
  
    // Click the "Add to Library" button for the first book
    fireEvent.click(addButtons[0]);
  
    // Check that handleAddBook was called with the correct book
    expect(mockHandleAddBook).toHaveBeenCalledTimes(1);
    expect(mockHandleAddBook).toHaveBeenCalledWith(mockBooks[0]);
  });
});