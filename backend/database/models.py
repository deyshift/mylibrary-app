import sqlite3
from database.db import get_db_connection

def add_book_to_library(title, authors, description, cover_art):
    """
    Add a book to the library database if it doesn't already exist.
    """
    validate_input(title, authors, description)  # Validate input
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO library (title, authors, description, cover_art)
                VALUES (?, ?, ?, ?)
            """, (title, authors, description, cover_art))
            conn.commit()
        print(f"Book '{title}' added to your library!")
    except sqlite3.IntegrityError:
        print(f"Book '{title}' already exists in your library!")
    except sqlite3.Error as e:
        print(f"Error adding book to library: {e}")


def get_all_books():
    """
    Retrieve all books from the library database.
    """
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, authors, description, status FROM library")
            books = cursor.fetchall()
        return books
    except sqlite3.Error as e:
        print(f"Error retrieving books: {e}")
        return []


def is_book_in_library(title):
    """
    Check if a book with the given title exists in the library database.
    The search is case-insensitive.
    """
    validate_input(title, None, None)  # Validate only the title
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, authors, description, status FROM library WHERE LOWER(title) = LOWER(?)", (title,))
            book = cursor.fetchone()
        return book
    except sqlite3.Error as e:
        print(f"Error checking if book is in library: {e}")
        return None


def update_book_status(title, status):
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