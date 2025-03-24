from database.models import (
    add_book_to_library,
    get_all_books,
    is_book_in_library,
    update_book_status,
)

def add_book(title, authors, description, cover_art):
    """
    Add a book to the library.
    Handles validation and checks before interacting with the database.
    """
    if is_book_in_library(title):
        raise Exception(f"Book '{title}' already exists in your library!")

    add_book_to_library(title, authors, description, cover_art)


def get_books():
    """
    Retrieve all books from the library.
    """
    return get_all_books()


def is_book_in_library(title):
    """
    Check if a book exists in the library by title.
    """
    return is_book_in_library(title)


def update_book_status(title, status):
    """
    Update the reading status of a book in the library.
    """
    valid_statuses = ["unread", "read", "currently reading"]
    if status not in valid_statuses:
        raise ValueError(f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}")

    update_book_status(title, status)