from database import is_book_in_library
from search_books import search_books

def search_personal_library():
    """
    Search for a specific book in the personal library by title.
    """
    query = input("\nEnter the exact title of the book to search in your library: ")
    book = is_book_in_library(query)
    
    if book:
        print("\nBook found in your library:")
        print(f"ID: {book[0]}, Title: {book[1]}, Authors: {book[2]}, Description: {book[3]}")
    else:
        print("\nNo matching book found in your library.")

def search_online_books():
    """
    Search for books online using the Google Books API and optionally add them to the library.
    """
    query = input("\nEnter a book title or keyword to search online: ")
    search_books(query)  # This function already handles displaying results and adding books.