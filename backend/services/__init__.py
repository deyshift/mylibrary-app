# Import functions from bs_scrape_service
from .bs_scrape_service import (
    search_open_library_author,
    fetch_open_library_author_bio,
    search_open_library_book,
    fetch_open_library_book_summary,
    quote_of_the_day,
    fetch_quotes_from_wikiquote,
)

# Import functions from library_service
from .library_service import (
    add_book,
    get_books,
    is_book_in_library,
    update_book_status,
)

# Import functions from gapi_search_service
from .gapi_search_service import search_books

# Define the public API of the services package
__all__ = [
    # bs_scrape_service functions
    "search_open_library_author",
    "fetch_open_library_author_bio",
    "search_open_library_book",
    "fetch_open_library_book_summary",
    "quote_of_the_day",
    "fetch_quotes_from_wikiquote",
    
    # library_service functions
    "add_book",
    "get_books",
    "is_book_in_library",
    "update_book_status",
    
    # gapi_search_service functions
    "search_books",
]