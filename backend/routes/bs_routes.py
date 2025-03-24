from flask import Blueprint, request, jsonify
from services.bs_scrape_service import (
    search_open_library_author,
    fetch_open_library_author_bio,
    search_open_library_book,
    fetch_open_library_book_summary,
    quote_of_the_day,
)

# Create a Blueprint for the scraping service
bs_scrape_bp = Blueprint("bs_scrape", __name__)

@bs_scrape_bp.route("/api/search_author", methods=["GET"])
def search_author():
    """
    Search for an author on Open Library and return their profile URL.
    """
    author_name = request.args.get("author_name")
    if not author_name:
        return jsonify({"error": "Author name is required"}), 400

    try:
        author_url = search_open_library_author(author_name)
        if not author_url:
            return jsonify({"message": "Author not found"}), 404
        return jsonify({"author_url": author_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bs_scrape_bp.route("/api/fetch_author_bio", methods=["GET"])
def fetch_author_bio():
    """
    Fetch an author's biography and image from Open Library.
    """
    author_name = request.args.get("author_name")
    if not author_name:
        return jsonify({"error": "Author name is required"}), 400

    try:
        bio_data = fetch_open_library_author_bio(author_name)
        return jsonify(bio_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bs_scrape_bp.route("/api/search_book", methods=["GET"])
def search_book():
    """
    Search for a book on Open Library and return its page URL.
    """
    book_title = request.args.get("book_title")
    if not book_title:
        return jsonify({"error": "Book title is required"}), 400

    try:
        book_url = search_open_library_book(book_title)
        if not book_url:
            return jsonify({"message": "Book not found"}), 404
        return jsonify({"book_url": book_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bs_scrape_bp.route("/api/fetch_book_summary", methods=["GET"])
def fetch_book_summary():
    """
    Fetch a book's summary from Open Library.
    """
    book_url = request.args.get("book_url")
    if not book_url:
        return jsonify({"error": "Book URL is required"}), 400

    try:
        summary = fetch_open_library_book_summary(book_url)
        return jsonify({"summary": summary}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bs_scrape_bp.route("/api/quote_of_the_day", methods=["GET"])
def get_quote_of_the_day():
    """
    Fetch the quote of the day from Wikiquote.
    """
    try:
        quote = quote_of_the_day()
        return jsonify({"quote": quote}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500