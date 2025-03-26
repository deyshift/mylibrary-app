const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/api/get_books`);
  if (!response.ok) {
    throw new Error("Failed to fetch library");
  }
  return response.json();
};

export const searchBooks = async (query: string) => {
  const response = await fetch(`${API_URL}/search_books?query=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const addBook = async (book: any, status: string) => {
  const response = await fetch(`${API_URL}/api/add_book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...book, status }),
  });
  if (!response.ok) {
    throw new Error("Failed to add book to library");
  }
  return response.json();
};

export const getQuoteOfTheDay = async () => {
  const response = await fetch(`${API_URL}/api/quote_of_the_day`);
  if (!response.ok) {
    throw new Error("Failed to fetch the quote of the day");
  }
  return response.json();
};