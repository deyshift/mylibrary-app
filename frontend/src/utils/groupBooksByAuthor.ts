import { Book } from "../types/book";

export const groupBooksByAuthor = (books: Book[]) => {
  const grouped: { [key: string]: Book[] } = {};

  books.forEach((book) => {
    const lastName = book.authors?.[0]?.split(" ").pop() || ""; // Get the last name of the first author
    const firstLetter = lastName.charAt(0).toUpperCase();

    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }

    grouped[firstLetter].push(book);
  });

  return grouped;
};