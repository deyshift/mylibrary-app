import { render, screen, fireEvent } from "@testing-library/react";
import BookList from "./BookList";
import "@testing-library/jest-dom";

const mockBooks = [
  {
    isbn: "978-3-16-148410-0",
    title: "Book One",
    authors: "Author A, Author B",
    description: "This is the description for Book One.",
    cover_art: "https://via.placeholder.com/140x200",
  },
  {
    isbn: "978-1-23-456789-7",
    title: "Book Two",
    authors: "Author C",
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
  
    // Check that each book's title, authors, and description are displayed
    mockBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
  
      // Use a custom matcher for the "Authors" text
      expect(
        screen.getByText((_, element) => {
          const hasText = (node: Element) =>
            node.textContent === `Authors: ${book.authors}`;
          const elementHasText = hasText(element!);
          const childrenDontHaveText = Array.from(element!.children).every(
            (child) => !hasText(child)
          );
          return elementHasText && childrenDontHaveText;
        })
      ).toBeInTheDocument();
  
      // Use a custom matcher for the "Description" text
      expect(
        screen.getByText((_, element) => {
          const hasText = (node: Element) =>
            node.textContent === `Description: ${book.description}`;
          const elementHasText = hasText(element!);
          const childrenDontHaveText = Array.from(element!.children).every(
            (child) => !hasText(child)
          );
          return elementHasText && childrenDontHaveText;
        })
      ).toBeInTheDocument();
    });
  });

  it("calls handleAddBook when the 'Add to Library' button is clicked", () => {
    render(<BookList books={mockBooks} handleAddBook={mockHandleAddBook} />);

    // Click the "Add to Library" button for the first book
    const addButton = screen.getAllByRole("button", { name: /add to library/i })[0];
    fireEvent.click(addButton);

    // Check that handleAddBook was called with the correct book
    expect(mockHandleAddBook).toHaveBeenCalledTimes(1);
    expect(mockHandleAddBook).toHaveBeenCalledWith(mockBooks[0]);
  });
});