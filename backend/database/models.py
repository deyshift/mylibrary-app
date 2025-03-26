import sqlite3
import json
from database.db import get_db_connection

def add_book_to_library(isbn, title, authors, description, cover_art, status="unread"):
    """
    Add a book to the library database if it doesn't already exist.
    """
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}")

    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # Ensure authors is stored as a JSON array
            authors_json = json.dumps(authors) if isinstance(authors, list) else json.dumps([authors])
            cursor.execute("""
                INSERT INTO library (isbn, title, authors, description, cover_art, status)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (isbn, title, authors_json, description, cover_art, status))
            conn.commit()
            print(f"Book '{title}' with ISBN '{isbn}' added to your library with status '{status}'!")
    except sqlite3.Error as e:
        print(f"Error adding book to library: {e}")
        raise


def get_all_books():
    """
    Retrieve all books from the library database, ordered alphabetically by the last name of the first author.
    """
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT isbn, title, authors, description, cover_art, status
                FROM library
            """)
            rows = cursor.fetchall()

            # Convert rows to dictionaries and decode authors field
            books = []
            for row in rows:
                authors = json.loads(row["authors"]) if row["authors"] else []
                # Use the last word in the first author's name as the last name
                first_author = authors[0] if authors else ""  # Use the first author if available
                last_name = first_author.split()[-1] if first_author else ""  # Get the last word

                books.append({
                    "isbn": row["isbn"],
                    "title": row["title"],
                    "authors": authors,  # Decode JSON
                    "description": row["description"],
                    "cover_art": row["cover_art"],
                    "status": row["status"],
                    "sort_key": last_name.lower()  # Use lowercase last name for sorting
                })

            # Sort books by the last name of the first author
            books.sort(key=lambda book: book["sort_key"])

            # Remove the sort_key before returning the books
            for book in books:
                book.pop("sort_key", None)

            return books
    except Exception as e:
        print(f"Error retrieving books: {e}")  # Debugging line
        raise


def is_book_in_library_by_title(title):
    """
    Check if a book with the given title exists in the library database.
    """
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM library WHERE title = ?", (title,))
            return cursor.fetchone() is not None
    except sqlite3.Error as e:
        print(f"Error finding book: {e}")
        return False


def update_book_status_in_db(title, status):
    """
    Update the reading status of a book in the library.
    """
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}")

    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE library
                SET status = ?
                WHERE LOWER(title) = LOWER(?)
            """, (status, title))
            conn.commit()

        if cursor.rowcount == 0:
            print(f"No book found with the title '{title}'.")
        else:
            print(f"Updated the status of '{title}' to '{status}'.")
    except sqlite3.Error as e:
        print(f"Error updating book status: {e}")


def delete_book_by_isbn(isbn):
    """
    Delete a book from the library database by its ISBN.
    """
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM library WHERE isbn = ?", (isbn,))
            if cursor.rowcount == 0:
                raise ValueError(f"No book found with ISBN '{isbn}'")
            conn.commit()
            print(f"Book with ISBN '{isbn}' deleted from the database.")  # Debugging line
    except sqlite3.Error as e:
        print(f"Error deleting book from library: {e}")
        raise


def validate_input(title, authors, description):
    """
    Validate and sanitize input for adding or searching books.
    """
    if not title or not isinstance(title, str) or title.strip() == "":
        raise ValueError("Title is required and must be a non-empty string.")
    if len(title) > 255:
        raise ValueError("Title must not exceed 255 characters.")
    if authors and not isinstance(authors, str):
        raise ValueError("Authors must be a string.")
    if authors and len(authors) > 255:
        raise ValueError("Authors must not exceed 255 characters.")
    if description and not isinstance(description, str):
        raise ValueError("Description must be a string.")
    if description and len(description) > 1000:
        raise ValueError("Description must not exceed 1000 characters.")