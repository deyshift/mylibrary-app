import pytest
from unittest.mock import patch
from services.library_service import (
    add_book,
    get_books,
    is_book_in_library,
    update_book_status,
)

@patch("services.library_service.is_book_in_library")
@patch("services.library_service.add_book_to_library")
def test_add_book_success(mock_add_book_to_library, mock_is_book_in_library):
    # Simulate the book not existing in the library
    mock_is_book_in_library.return_value = None

    # Call the service function
    add_book("The Hobbit", "J.R.R. Tolkien", "A fantasy novel", "cover.jpg")

    # Assert that the database function was called with the correct arguments
    mock_add_book_to_library.assert_called_once_with(
        "The Hobbit", "J.R.R. Tolkien", "A fantasy novel", "cover.jpg"
    )

@patch("services.library_service.is_book_in_library")
def test_add_book_already_exists(mock_is_book_in_library):
    # Simulate the book already existing in the library
    mock_is_book_in_library.return_value = {"title": "The Hobbit"}

    # Call the service function and expect an exception
    with pytest.raises(Exception, match="Book 'The Hobbit' already exists in your library!"):
        add_book("The Hobbit", "J.R.R. Tolkien", "A fantasy novel", "cover.jpg")

@patch("services.library_service.get_all_books")
def test_get_books(mock_get_all_books):
    # Simulate the database returning a list of books
    mock_get_all_books.return_value = [
        {"title": "The Hobbit", "author": "J.R.R. Tolkien"},
        {"title": "1984", "author": "George Orwell"},
    ]

    # Call the service function
    books = get_books()

    # Assert the result
    assert len(books) == 2
    assert books[0]["title"] == "The Hobbit"
    assert books[1]["author"] == "George Orwell"

@patch("services.library_service.is_book_in_library")
def test_is_book_in_library(mock_is_book_in_library):
    # Simulate the book existing in the library
    mock_is_book_in_library.return_value = {"title": "The Hobbit"}

    # Call the service function
    book = is_book_in_library("The Hobbit")

    # Assert the result
    assert book is not None
    assert book["title"] == "The Hobbit"

@patch("services.library_service.update_book_status")
def test_update_book_status_success(mock_update_book_status):
    # Call the service function with valid status
    update_book_status("The Hobbit", "read")

    # Assert that the database function was called with the correct arguments
    mock_update_book_status.assert_called_once_with("The Hobbit", "read")

def test_update_book_status_invalid_status():
    # Call the service function with an invalid status and expect a ValueError
    with pytest.raises(ValueError, match="Invalid status. Valid statuses are: unread, read, currently reading"):
        update_book_status("The Hobbit", "invalid_status")