import requests
from database import add_book_to_library

def search_books(query):
    """
    Search for books using the Google Books API and print their details, including cover art.
    """
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}"
    print(f"Searching for books with query: {query}")
    print("========================================")
    response = requests.get(url)
    if response.status_code == 200:
        print("Displaying search results...")
        print("========================================")
        books = response.json().get("items", [])
        if not books:
            print("No books found.")
            return
        for index, book in enumerate(books[:5], start=1):  # Limit to 5 results
            title = book["volumeInfo"].get("title", "No Title")
            authors = book["volumeInfo"].get("authors", ["Unknown Author"])
            description = book["volumeInfo"].get("description", "No Description Available")
            image_links = book["volumeInfo"].get("imageLinks", {})
            cover_art = image_links.get("thumbnail", "No Cover Art Available")
            
            print(f"\n{index}. Title: {title}")
            print(f"   Authors: {', '.join(authors)}")
            print(f"   Description: {description}")
            print(f"   Cover Art: {cover_art}")
        
        # Let the user choose a book to add to the library
        choice = input("\nEnter the number of the book to add to your library (or press Enter to skip): ")
        if choice.isdigit() and 1 <= int(choice) <= len(books[:5]):
            selected_book = books[int(choice) - 1]
            title = selected_book["volumeInfo"].get("title", "No Title")
            authors = ", ".join(selected_book["volumeInfo"].get("authors", ["Unknown Author"]))
            description = selected_book["volumeInfo"].get("description", "No Description Available")
            cover_art = selected_book["volumeInfo"].get("imageLinks", {}).get("thumbnail", "No Cover Art Available")
            add_book_to_library(title, authors, description, cover_art)
        else:
            print("No book added to the library.")
    else:
        print(f"Failed to fetch books. HTTP Status Code: {response.status_code}")