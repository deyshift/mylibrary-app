from database import initialize_database, get_all_books, is_book_in_library
from api import search_books

def main():
    """
    Entry point for the MyLibrary application.
    """
    print("Welcome to MyLibrary: Your personal library database!")
    initialize_database()

    while True:
        print("\nOptions:")
        print("1. Search for books in your personal library")
        print("2. Search for books online (Google Books API)")
        print("3. Exit")
        choice = input("Enter your choice (1/2/3): ")

        if choice == "3":
            print("Goodbye!")
            break
        elif choice == "1":
            search_personal_library()
        elif choice == "2":
            search_online_books()
        else:
            print("Invalid choice. Please try again.")

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

if __name__ == "__main__":
    main()