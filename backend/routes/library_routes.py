from flask import Blueprint, request, jsonify
from services.library_service import (
    add_book,
    get_books,
    is_book_in_library,
    update_book_status,
    delete_book
)

library_bp = Blueprint("library", __name__)

@library_bp.route("/api/add_book", methods=["POST"])
def add_book_endpoint():
    """
    Add a book to the library.
    """
    data = request.json
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    isbn = data.get("isbn")
    title = data.get("title")
    authors = data.get("authors")
    description = data.get("description")
    cover_art = data.get("cover_art")
    status = data.get("status", "unread").lower()  # Default to "unread" if no status is provided

    if not title or not authors or not description:
        return jsonify({"error": "Title, authors, and description are required"}), 400

    # Validate the status
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        return jsonify({"error": f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}"}), 400

    # Ensure authors is a list and clean up "By " prefix
    if isinstance(authors, str):
        authors = [author.strip() for author in authors.split(",")]
    authors = [author.replace("By ", "").strip() for author in authors]

    try:
        # Call the service layer to add the book
        add_book(isbn, title, authors, description, cover_art, status)
        print(f"Book '{title}' added successfully with status '{status}'.")  # Debugging line
        return jsonify({"message": f"Book '{title}' with ISBN '{isbn}' added to your library with status '{status}'!"}), 201
    except Exception as e:
        print(f"Error adding book: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500


@library_bp.route("/api/get_books", methods=["GET"])
def get_books_endpoint():
    """
    Retrieve all books from the library.
    """
    try:
        books = get_books()
        if not books:
            print("No books found in the library.")  # Debug log
        return jsonify(books)  # Return an empty list if no books are found
    except Exception as e:
        print(f"Error in /api/get_books: {e}")
        return jsonify({"error": str(e)}), 500


@library_bp.route("/api/is_book_in_library", methods=["GET"])
def is_book_in_library_endpoint():
    """
    Check if a book exists in the library by title.
    """
    title = request.args.get("title")
    if not title:
        return jsonify({"error": "Title query parameter is required"}), 400

    try:
        book = is_book_in_library(title)
        if book:
            return jsonify({"exists": True, "book": dict(book)})
        else:
            return jsonify({"exists": False})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@library_bp.route("/api/update_book_status", methods=["PUT"])
def update_book_status_endpoint():
    """
    Update the reading status of a book in the library.
    """
    data = request.json
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    title = data.get("title")
    status = data.get("status")

    if not title or not status:
        return jsonify({"error": "Title and status are required"}), 400

    try:
        update_book_status(title, status)
        return jsonify({"message": f"Updated the status of '{title}' to '{status}'."}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@library_bp.route("/api/delete_book/<isbn>", methods=["DELETE"])
def delete_book_endpoint(isbn):
    """
    Delete a book from the library by its ISBN.
    """
    try:
        # Call the service layer to delete the book
        delete_book(isbn)
        print(f"Book with ISBN '{isbn}' deleted successfully.")  # Debugging line
        return jsonify({"message": f"Book with ISBN '{isbn}' deleted successfully!"}), 200
    except Exception as e:
        print(f"Error deleting book: {e}")  # Debugging line
        return jsonify({"error": str(e)}), 500