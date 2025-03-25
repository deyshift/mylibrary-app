from .db import get_db_connection, initialize_database  # Expose database connection and initialization
from .models import add_book_to_library, get_all_books, is_book_in_library_by_title, update_book_status  # Expose model functions

# Define what is accessible when importing the `database` package
__all__ = [
    "get_db_connection",
    "initialize_database",
    "add_book_to_library",
    "get_all_books",
    "is_book_in_library_by_title",
    "update_book_status",
]