import requests
import urllib.parse  # Import for encoding the query

def search_books(query, max_results=40):
    """
    Search for books using the Google Books API and return results.
    """
    if not query:
        raise ValueError("Query parameter is required")
    
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
            volume_info = book.get("volumeInfo", {})
            title = volume_info.get("title", "No Title")
            authors = volume_info.get("authors", ["Unknown Author"])
            description = volume_info.get("description", "No Description Available")
            image_links = volume_info.get("imageLinks", {})
            cover_art = image_links.get("thumbnail", "No Cover Art Available")

            # Extract ISBN
            industry_identifiers = volume_info.get("industryIdentifiers", [])
            isbn = "No ISBN Available"
            for identifier in industry_identifiers:
                if identifier.get("type") == "ISBN_13":
                    isbn = identifier.get("identifier")
                    break
                elif identifier.get("type") == "ISBN_10" and isbn == "No ISBN Available":
                    isbn = identifier.get("identifier")

            results.append({
                "isbn": isbn,
                "title": title,
                "authors": authors,
                "description": description,
                "cover_art": cover_art
            })

        return results

    except Exception as e:
        print(f"Error occurred: {e}")
        return []