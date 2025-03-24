from flask import Blueprint, request, jsonify
from services.gapi_search_service import search_books  # Import the service function

# Create a Blueprint for Google Books API routes
gapi_bp = Blueprint("gapi", __name__)

@gapi_bp.route('/search_books', methods=['GET'])
def search_books_route():
    """
    Route to search for books using the Google Books API.
    """
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    
    try:
        # Call the service function to perform the search
        books = search_books(query)
        return jsonify(books)
    except Exception as e:
        return jsonify({"error": str(e)}), 500