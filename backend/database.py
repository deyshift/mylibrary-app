import sqlite3
import time
from functools import wraps

# In-memory rate-limiting storage
rate_limit_cache = {}

"""
Adding a note that I want to be able to mark a book as read or unread.
For our frontend display, the ideal would be for the user to search for all
unread books in their library if they are trying to decide what to read. 
Then to be able to mark it as currently reading or read once finished.
"""

def rate_limit(limit_seconds):
    """
    Decorator to enforce rate limiting for a function.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            user_key = func.__name__  # Use the function name as the key
            current_time = time.time()
            if user_key in rate_limit_cache:
                last_called = rate_limit_cache[user_key]
                if current_time - last_called < limit_seconds:
                    raise Exception(f"Rate limit exceeded. Try again in {limit_seconds - (current_time - last_called):.2f} seconds.")
            rate_limit_cache[user_key] = current_time
            return func(*args, **kwargs)
        return wrapper
    return decorator


@rate_limit(1)  # Limit to 1 call per second
def initialize_database():
    """
    Create the library database and table if it doesn't exist.
    """
    try:
        with sqlite3.connect("library.db") as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS library (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL UNIQUE,  -- Enforce unique titles
                    authors TEXT,
                    description TEXT,
                    cover_art TEXT,  -- URL for the book's cover art
                    status TEXT DEFAULT 'unread'  -- Reading status: unread, read, or currently reading
                )
            """)
            conn.commit()
            print("Database initialized successfully.")
    except sqlite3.Error as e:
        print(f"Error initializing database: {e}")


@rate_limit(1)  # Limit to 1 call per second
def add_book_to_library(title, authors, description, cover_art):
    """
    Add a book to the library database if it doesn't already exist.
    """
    validate_input(title, authors, description)  # Validate input
    try:
        with sqlite3.connect("library.db") as conn:
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


@rate_limit(1)  # Limit to 1 call per second
def get_all_books():
    """
    Retrieve all books from the library database.
    """
    try:
        with sqlite3.connect("library.db") as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, title, authors, description FROM library")
            books = cursor.fetchall()

        if not books:
            print("There are no books in your library. Search for books to get started!")
            return []
        
        return books
    except sqlite3.Error as e:
        print(f"Error retrieving books: {e}")
        return []
    

@rate_limit(1)  # Limit to 1 call per second
def is_book_in_library(title):
    """
    Check if a book with the given title exists in the library database.
    The search is case-insensitive.
    """
    validate_input(title, None, None)  # Validate only the title
    try:
        with sqlite3.connect("library.db") as conn:
            cursor = conn.cursor()
            # Use LOWER() to make the search case-insensitive
            cursor.execute("SELECT id, title, authors, description FROM library WHERE LOWER(title) = LOWER(?)", (title,))
            book = cursor.fetchone()
        return book
    except sqlite3.Error as e:
        print(f"Error checking if book is in library: {e}")
        return None


@rate_limit(1)  # Limit to 1 call per second
def update_book_status(title, status):
    """
    Update the reading status of a book in the library.
    """
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}")

    try:
        with sqlite3.connect("library.db") as conn:
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