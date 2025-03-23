import requests
import urllib.parse  # Import for encoding the query

def search_books(query, max_results=40):
    """
    Search for books using the Google Books API and return results.
    """
    try:
        # Encode the query to handle spaces and special characters
        encoded_query = urllib.parse.quote(query)
        
        # Ensure max_results is within the allowed range (1-40)
        max_results = min(max(max_results, 1), 40)

        # Construct the API URL
        url = f"https://www.googleapis.com/books/v1/volumes?q={encoded_query}&maxResults={max_results}"
        print(f"Fetching books from URL: {url}")  # Log the API URL for debugging

        response = requests.get(url)
        if response.status_code != 200:
            print(f"Error: Received status code {response.status_code}")
            return []

        # Parse the API response
        data = response.json()
        books = data.get("items", [])

        # Extract book details
        results = []
        for book in books:
            title = book["volumeInfo"].get("title", "No Title")
            authors = book["volumeInfo"].get("authors", ["Unknown Author"])
            description = book["volumeInfo"].get("description", "No Description Available")
            image_links = book["volumeInfo"].get("imageLinks", {})
            cover_art = image_links.get("thumbnail", "No Cover Art Available")
            results.append({
                "title": title,
                "authors": authors,
                "description": description,
                "cover_art": cover_art
            })

        return results

    except Exception as e:
        print(f"Error occurred: {e}")
        return []