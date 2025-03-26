const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getBookSummary = async (bookTitle: string) => {
  const response = await fetch(`${API_URL}/api/fetch_book_summary?book_title=${bookTitle}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book summary");
  }
  return response.json(); // Let TypeScript infer the return type
};