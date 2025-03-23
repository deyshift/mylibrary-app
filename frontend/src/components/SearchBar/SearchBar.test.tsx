import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockSetQuery = jest.fn();
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders the search bar with the correct placeholder", () => {
    render(
      <SearchBar query="" setQuery={mockSetQuery} handleSearch={mockHandleSearch} />
    );

    // Check if the TextField is rendered with the correct placeholder
    const inputElement = screen.getByPlaceholderText(
      "Search for books by title, keyword, or author"
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("calls setQuery when the user types in the input field", () => {
    render(
      <SearchBar query="" setQuery={mockSetQuery} handleSearch={mockHandleSearch} />
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText(
      "Search for books by title, keyword, or author"
    );
    fireEvent.change(inputElement, { target: { value: "The Hobbit" } });

    // Check if setQuery is called with the correct value
    expect(mockSetQuery).toHaveBeenCalledTimes(1);
    expect(mockSetQuery).toHaveBeenCalledWith("The Hobbit");
  });

  it("calls handleSearch when the Enter key is pressed", () => {
    render(
      <SearchBar query="The Hobbit" setQuery={mockSetQuery} handleSearch={mockHandleSearch} />
    );

    // Simulate pressing the Enter key on the form
    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    // Check if handleSearch is called
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });

  it("calls handleSearch when the form is submitted", () => {
    render(
      <SearchBar query="The Hobbit" setQuery={mockSetQuery} handleSearch={mockHandleSearch} />
    );

    // Simulate form submission
    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    // Check if handleSearch is called
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});