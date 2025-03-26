import { Book } from "../types/book";

export const groupBooksByRange = (books: Book[]) => {
  const grouped: Record<string, Book[]> = {};

  // Helper function to determine the range for a given letter
  const getRangeForLetter = (letter: string): string => {
    if ("A" <= letter && letter <= "G") return "A-G";
    if ("H" <= letter && letter <= "N") return "H-N";
    if ("O" <= letter && letter <= "T") return "O-T";
    if ("U" <= letter && letter <= "Z") return "U-Z";
    return "Other"; // For non-alphabetical characters
  };

  // Assign books to ranges based on the first letter of the author's last name
  books.forEach((book) => {
    const lastName = book.authors?.[0]?.split(" ").pop()?.toUpperCase() || "A"; // Get the last name of the first author
    const range = getRangeForLetter(lastName.charAt(0)); // Determine the range for the first letter of the last name

    if (!grouped[range]) {
      grouped[range] = [];
    }
    grouped[range].push(book);
  });

  return grouped;
};