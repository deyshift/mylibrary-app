import random
from bs4 import BeautifulSoup
import requests


def search_open_library_author(author_name):
    """
    Search Open Library for an author and return the URL of their profile page.
    """
    search_url = f"https://openlibrary.org/search?q={author_name.replace(' ', '+')}"
    response = requests.get(search_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Open Library author search results.")

    soup = BeautifulSoup(response.text, "html.parser")

    # Locate the first author link in the search results
    first_result = soup.select_one(".bookauthor a")
    if not first_result:
        return None  # No author found

    # Construct the full URL for the author's profile page
    author_url = f"https://openlibrary.org{first_result['href']}"
    return author_url


def fetch_open_library_author_bio(author_name):
    """
    Fetch the author's biography and image from Open Library using their name.
    Return a dictionary containing the biography text, source link, and image URL.
    """
    # Step 1: Search for the author's profile page
    author_url = search_open_library_author(author_name)
    if not author_url:
        return {
            "biography": "No biography found for this author on Open Library.",
            "image_url": None,
        }

    # Step 2: Fetch the biography and image from the author's profile page
    response = requests.get(author_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Open Library author page.")

    soup = BeautifulSoup(response.text, "html.parser")

    # Locate the biography section (if available)
    bio_section = soup.select_one('div[itemprop="description"]')
    if not bio_section:
        biography = "No biography available for this author."
    else:
        # Extract all paragraphs and clean up the text
        paragraphs = bio_section.find_all("p")
        if paragraphs:
            bio_text = "\n\n".join(p.text.strip() for p in paragraphs)
        else:
            # If no <p> tags are found, use the raw text of the bio_section
            bio_text = bio_section.text.strip()

        # Combine the biography text
        biography = bio_text

    # Locate the author's image (if available)
    image_element = soup.select_one(".SRPCover.bookCover img")  # Adjust selector if necessary
    if image_element and image_element.get("src"):
        image_url = f"https:{image_element['src']}"  # Convert relative URL to full URL
    else:
        image_url = None

    return {
        "biography": biography,
        "image_url": image_url,
    }


def search_open_library_book(book_title):
    """
    Search Open Library for a book by title and return the URL of the book's page.
    """
    search_url = f"https://openlibrary.org/search?q={book_title.replace(' ', '+')}"
    response = requests.get(search_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Open Library book search results.")

    soup = BeautifulSoup(response.text, "html.parser")
    first_result = soup.select_one(".searchResultItem a")
    if not first_result:
        return None  # No book found

    book_url = f"https://openlibrary.org{first_result['href']}"
    return book_url


def fetch_open_library_book_summary(book_url):
    """
    Fetch the book summary from the Open Library book page.
    """
    response = requests.get(book_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Open Library book page.")

    soup = BeautifulSoup(response.text, "html.parser")
    description_element = soup.select_one(".book-description")
    if not description_element:
        return "No Summary Available."
    
    # Extract the text content of the description, excluding any "Read more" or "Read less" buttons
    for button in description_element.select(".read-more__toggle"):
        button.extract()  # Remove the button elements

    return description_element.text.strip()


import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup

def quote_of_the_day():
    """
    Fetch the quote of the day from Wikiquote's Main Page.
    """
    url = "https://en.wikiquote.org/wiki/Main_Page"
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch the quote of the day."}

        soup = BeautifulSoup(response.text, "html.parser")

        # Locate the "Quote of the Day" section
        quote_section = soup.select_one("table[align='center'] td[align='center']")
        if not quote_section:
            return {"error": "No quote of the day found."}

        # Extract the text of the quote
        quote = quote_section.get_text(separator=" ").strip()

        # Locate the author (if available)
        author_section = soup.select_one("table[align='center'] td[style='font-size:smaller;']")
        author = author_section.get_text(separator=" ").strip() if author_section else "Unknown Author"

        # Clean up the quote and author
        quote = " ".join(quote.split())  # Remove extra whitespace
        author = " ".join(author.split())  # Remove extra whitespace

        # Ensure the author name does not have extra "~" characters
        if author.startswith("~") and author.endswith("~"):
            author = author.strip("~").strip()

        # Remove the author's name from the quote if it appears at the end
        # This handles cases where the author's name is appended to the quote in the HTML
        if quote.endswith(f"~ {author} ~"):
            quote = quote[: -len(f"~ {author} ~")].strip()

        # Return the quote and author as a dictionary
        return {"quote": quote, "author": author}
    except Exception as e:
        return {"error": f"Error fetching the quote of the day: {e}"}


def search_wikiquote_author(author_name):
    """
    Search Wikiquote for an author and return the URL of their page.
    """
    search_url = f"https://en.wikiquote.org/w/index.php?search={author_name.replace(' ', '+')}"

    response = requests.get(search_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Wikiquote search results.")

    # Check if the response URL is already the author's page
    if "/wiki/" in response.url:
        return response.url

    soup = BeautifulSoup(response.text, "html.parser")

    # Look for the first search result
    first_result = soup.select_one(".mw-search-result-heading a")
    if not first_result:
        return None  # No author page found

    author_url = f"https://en.wikiquote.org{first_result['href']}"
    return author_url


def scrape_wikiquote_quotes(author_url):
    """
    Scrape famous quotes from an author's Wikiquote page.
    """
    response = requests.get(author_url)
    if response.status_code != 200:
        raise Exception("Failed to fetch Wikiquote author page.")

    soup = BeautifulSoup(response.text, "html.parser")
    quotes = []

    # Extract quotes from the main content
    for quote in soup.select(".mw-parser-output ul > li"):
        # Remove any nested <ul> elements to avoid metadata or links
        for nested_ul in quote.find_all("ul"):
            nested_ul.decompose()  # Completely remove nested <ul> elements

        # Extract the cleaned text of the main <li> element
        text = quote.get_text(separator=" ").strip()

        if text:
            quotes.append(text)

    return quotes[:5]  # Limit to the first 10 quotes for better coverage


def fetch_quotes_from_wikiquote(author_name):
    """
    Search Wikiquote for an author and fetch their famous quotes.
    """
    try:
        # Step 1: Search for the author's Wikiquote page
        author_url = search_wikiquote_author(author_name)
        if not author_url:
            return ["No quotes found for this author on Wikiquote."]

        # Step 2: Scrape quotes from the author's page
        quotes = scrape_wikiquote_quotes(author_url)
        return quotes if quotes else ["No quotes available for this author."]
    except Exception as e:
        return [f"Error fetching quotes: {str(e)}"]