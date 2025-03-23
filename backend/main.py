from database import initialize_database, add_book_to_library
from library import search_personal_library
from search_books import search_books
from scrape import (
    fetch_open_library_author_bio,
    search_open_library_book,
    fetch_open_library_book_summary,
    fetch_quotes_from_wikiquote,
)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/search_books', methods=['GET'])
def search_books_route():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    try:
        books = search_books(query)
        return jsonify(books)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/api/add_book", methods=["POST"])
def add_book_endpoint():
    """
    Expose the add_book_to_library function as an API endpoint.
    """
    data = request.json
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    title = data.get("title")
    authors = data.get("authors")
    description = data.get("description")
    cover_art = data.get("cover_art")

    if not title or not authors or not description:
        return jsonify({"error": "Title, authors, and description are required"}), 400

    try:
        add_book_to_library(title, ", ".join(authors), description, cover_art)
        return jsonify({"message": f"Book '{title}' added to your library!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# def main():
#     """
#     Entry point for the MyLibrary application.
#     """
#     print("Welcome to MyLibrary: Your personal library database!")
#     initialize_database()

#     while True:
#         print("\nOptions:")
#         print("1. Search for books in your personal library")
#         print("2. Search for books online (Google Books API)")
#         print("3. Fetch author biography from Open Library")
#         print("4. Fetch famous quotes from Wikiquote")
#         print("5. Fetch book summary from Open Library")
#         print("6. Exit")
#         choice = input("Enter your choice (1/2/3/4/5/6): ")

#         if choice == "6":
#             print("Goodbye!")
#             break
#         elif choice == "1":
#             # Search for books in the personal library
#             search_personal_library()
#         elif choice == "2":
#             # Search for books online using Google Books API
#             query = input("Enter the title or keyword to search for books: ")
#             print(f"\nSearching for books with query: '{query}'...")
#             search_books(query)
#         elif choice == "3":
#             # Fetch author biography from Open Library
#             author_name = input("Enter the author's name: ")
#             print(f"\nSearching for '{author_name}' on Open Library...")
#             author_data = fetch_open_library_author_bio(author_name)

#             # Display the biography
#             if author_data["biography"].strip():
#                 print("\nAuthor Biography:")
#                 print(author_data["biography"])
#             else:
#                 print("No biography found for this author on Open Library.")
#         elif choice == "4":
#             # Fetch famous quotes from Wikiquote
#             author_name = input("Enter the author's name: ")
#             print(f"\nFetching famous quotes for '{author_name}' from Wikiquote...")
#             quotes = fetch_quotes_from_wikiquote(author_name)
#             print("Famous Quotes:")
#             for idx, quote in enumerate(quotes, start=1):
#                 print(f"{idx}. {quote}")
#         elif choice == "5":
#             # Fetch book summary from Open Library
#             book_title = input("Enter the title of the book: ")
#             print(f"\nSearching for '{book_title}' on Open Library...")
#             book_url = search_open_library_book(book_title)
#             if book_url:
#                 print(f"Book URL: {book_url}")
#                 print(f"\nFetching book summary for '{book_title}'...")
#                 book_summary = fetch_open_library_book_summary(book_url)
#                 print(f"Book Summary: {book_summary}")
#             else:
#                 print("No summary found for this book on Open Library.")
#         else:
#             print("Invalid choice. Please try again.")

if __name__ == "__main__":
    initialize_database()  # Ensure the database is initialized
    app.run(debug=True)    # Start the Flask application