from database.models import (
    add_book_to_library,
    get_all_books,
    is_book_in_library_by_title,
    update_book_status,
    delete_book_by_isbn,
)

def add_book(isbn, title, authors, description, cover_art, status):
    """
    Add a book to the library.
    Handles validation and checks before interacting with the database.
    """
    if is_book_in_library(title):
        raise Exception(f"Book '{title}' already exists in your library!")

    add_book_to_library(isbn, title, authors, description, cover_art, status)


def get_books():
    """
    Retrieve all books from the library.
    """
    return get_all_books()


def is_book_in_library(title):
    """
    Check if a book exists in the library by title.
    """
    return is_book_in_library_by_title(title)  # Call the correct database function


def update_book_status(title, status):
    """
    Update the reading status of a book in the library.
    """
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}")

    update_book_status(title, status)


def delete_book(isbn):
    """
    Service layer function to delete a book by its ISBN.
    """
    try:
        delete_book_by_isbn(isbn)  # Call the database layer function
    except ValueError as e:
        raise ValueError(str(e))  # Re-raise the ValueError for not found books
    except Exception as e:
        raise Exception(f"An error occurred while deleting the book: {e}")