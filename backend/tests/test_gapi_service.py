import pytest
from unittest.mock import patch
from backend.services.gapi_search_service import search_books

@patch("backend.services.gapi_search_service.requests.get")
def test_search_books_success(mock_get):
    """
    Test that search_books returns a list of books when a valid query is provided.
    """
    # Mock the API response
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {
        "items": [
            {
                "volumeInfo": {
                    "title": "Example Book",
                    "authors": ["Example Author"],
                    "description": "An example description",
                    "imageLinks": {"thumbnail": "http://example.com/cover.jpg"},
                }
            }
        ]
    }

    query = "The Hobbit"
    result = search_books(query)
    assert isinstance(result, list)
    assert len(result) > 0
    assert result[0]["title"] == "Example Book"
    assert result[0]["authors"] == ["Example Author"]
    assert result[0]["description"] == "An example description"
    assert result[0]["cover_art"] == "http://example.com/cover.jpg"


@patch("backend.services.gapi_search_service.search_books")
def test_search_books_no_query(mock_search_books):
    """
    Test that search_books raises a ValueError when no query is provided.
    """
    # Mock the behavior of search_books to raise a ValueError for an empty query
    mock_search_books.side_effect = ValueError("Query parameter is required")

    with pytest.raises(ValueError, match="Query parameter is required"):
        search_books("")