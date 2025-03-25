import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import "@testing-library/jest-dom";

const mockBook = {
  isbn: "978-3-16-148410-0",
  title: "Book One",
  authors: ["Author A", "Author B"],
  description: "This is the description for Book One.",
  cover_art: "https://via.placeholder.com/140x200",
};

describe("BookCard Component", () => {
  it("renders the book details correctly", () => {
    render(<BookCard book={mockBook} />);

    // Check that the title is rendered
    const titleElement = screen.getByTestId("book-title");
    expect(titleElement).toHaveTextContent(mockBook.title);

    // Check that the authors are rendered
    const authorsElement = screen.getByTestId("book-authors");
    expect(authorsElement).toHaveTextContent(mockBook.authors.join(", "));

    // Check that the cover image is rendered
    const coverImage = screen.getByTestId("book-cover");
    expect(coverImage).toHaveAttribute("src", mockBook.cover_art);
    expect(coverImage).toHaveAttribute("alt", mockBook.title);
  });

  it("renders a placeholder image if no cover_art is provided", () => {
    const bookWithoutCover = { ...mockBook, cover_art: "" };
    render(<BookCard book={bookWithoutCover} />);

    // Check that the placeholder image is rendered
    const placeholderImage = screen.getByTestId("book-cover");
    expect(placeholderImage).toHaveAttribute("src", "/placeholder.jpg");
    expect(placeholderImage).toHaveAttribute("alt", mockBook.title);
  });

  it("displays 'Unknown Author' if no authors are provided", () => {
    const bookWithoutAuthors = { ...mockBook, authors: [] };
    render(<BookCard book={bookWithoutAuthors} />);

    // Check that "Unknown Author" is displayed
    const authorsElement = screen.getByTestId("book-authors");
    expect(authorsElement).toHaveTextContent("Unknown Author");
  });
});