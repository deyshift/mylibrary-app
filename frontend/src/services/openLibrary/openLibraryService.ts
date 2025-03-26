const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getBookSummary = async (bookTitle: string) => {
  const response = await fetch(`${API_URL}/api/fetch_book_summary?book_title=${bookTitle}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book summary");
  }
  return response.json(); // Let TypeScript infer the return type
};

export const fetchAuthorBio = async (authorName: string) => {
    const response = await fetch(`${API_URL}/api/fetch_author_bio?author_name=${encodeURIComponent(authorName)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch author bio: ${response.statusText}`);
    }
  
    try {
      return await response.json(); // Parse the response as JSON
    } catch (err) {
      console.error("Error parsing JSON response:", err);
      throw new Error("Invalid JSON response from the server.");
    }
  };