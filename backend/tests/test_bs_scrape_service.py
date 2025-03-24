import pytest
from unittest.mock import MagicMock, patch
from backend.services.bs_scrape_service import (
    search_open_library_author,
    fetch_open_library_author_bio,
    search_open_library_book,
    fetch_open_library_book_summary,
    quote_of_the_day,
    fetch_quotes_from_wikiquote,
)

@pytest.fixture
def mock_requests_get():
    with patch("backend.services.bs_scrape_service.requests.get") as mock_get:
        yield mock_get

def test_search_open_library_author(mock_requests_get):
    # Mock the API response
    mock_requests_get.return_value.status_code = 200
    mock_requests_get.return_value.text = """
    <html>
        <body>
            <div class="bookauthor">
                <a href="/authors/OL12345A">Author Name</a>
            </div>
        </body>
    </html>
    """

    author_url = search_open_library_author("Author Name")
    assert author_url == "https://openlibrary.org/authors/OL12345A"

def test_search_open_library_author_no_results(mock_requests_get):
    # Mock the API response with no results
    mock_requests_get.return_value.status_code = 200
    mock_requests_get.return_value.text = "<html><body></body></html>"

    author_url = search_open_library_author("Unknown Author")
    assert author_url is None

def test_fetch_open_library_author_bio(mock_requests_get):
    # Mock the search and author page responses
    mock_requests_get.side_effect = [
        MagicMock(status_code=200, text="""
        <html>
            <body>
                <div class="bookauthor">
                    <a href="/authors/OL12345A">Author Name</a>
                </div>
            </body>
        </html>
        """),
        MagicMock(status_code=200, text="""
        <html>
            <body>
                <div itemprop="description">
                    <p>Biography paragraph 1.</p>
                    <p>Biography paragraph 2.</p>
                </div>
                <div class="SRPCover bookCover">
                    <img src="//example.com/image.jpg" />
                </div>
            </body>
        </html>
        """),
    ]

    bio = fetch_open_library_author_bio("Author Name")
    assert bio["biography"] == "Biography paragraph 1.\n\nBiography paragraph 2."
    assert bio["image_url"] == "https://example.com/image.jpg"

def test_search_open_library_book(mock_requests_get):
    # Mock the API response
    mock_requests_get.return_value.status_code = 200
    mock_requests_get.return_value.text = """
    <html>
        <body>
            <div class="searchResultItem">
                <a href="/books/OL12345M">Book Title</a>
            </div>
        </body>
    </html>
    """

    book_url = search_open_library_book("Book Title")
    assert book_url == "https://openlibrary.org/books/OL12345M"

def test_fetch_open_library_book_summary(mock_requests_get):
    # Mock the API response
    mock_requests_get.return_value.status_code = 200
    mock_requests_get.return_value.text = """
    <html>
        <body>
            <div class="book-description">
                <p>This is the book summary.</p>
                <button class="read-more__toggle">Read more</button>
            </div>
        </body>
    </html>
    """

    summary = fetch_open_library_book_summary("https://openlibrary.org/books/OL12345M")
    assert summary == "This is the book summary."


def test_quote_of_the_day(mock_requests_get):
    # Mock the Wikiquote response
    mock_requests_get.return_value.status_code = 200
    mock_requests_get.return_value.text = """
    <html>
        <body>
            <table align="center">
                <tr>
                    <td align="center">
                        There are many who are hypocrites although they think they are not, and there are many who are afraid of being hypocrites although they certainly are not. Which is the one and which is the other God knows, and none but He. ~ Walter Hilton ~
                    </td>
                </tr>
                <tr>
                    <td style="font-size:smaller;">~ Walter Hilton ~</td>
                </tr>
            </table>
        </body>
    </html>
    """

    # Call the function
    result = quote_of_the_day()

    # Assert the result
    assert result == {
        "quote": "There are many who are hypocrites although they think they are not, and there are many who are afraid of being hypocrites although they certainly are not. Which is the one and which is the other God knows, and none but He.",
        "author": "Walter Hilton"
    }
    

def test_fetch_quotes_from_wikiquote(mock_requests_get):
    # Mock the search and author page responses
    mock_requests_get.side_effect = [
        MagicMock(status_code=200, url="https://en.wikiquote.org/wiki/Author_Name"),
        MagicMock(status_code=200, text="""
        <html>
            <body>
                <div class="mw-parser-output">
                    <ul>
                        <li>Quote 1</li>
                        <li>Quote 2</li>
                    </ul>
                </div>
            </body>
        </html>
        """),
    ]

    quotes = fetch_quotes_from_wikiquote("Author Name")
    assert quotes == ["Quote 1", "Quote 2"]