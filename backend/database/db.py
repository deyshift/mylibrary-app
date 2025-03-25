import sqlite3
import time
from functools import wraps

# In-memory rate-limiting storage
rate_limit_cache = {}

def rate_limit(limit_seconds):
    """
    Decorator to enforce rate limiting for a function.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            user_key = func.__name__  # Use the function name as the key
            current_time = time.time()
            if user_key in rate_limit_cache:
                last_called = rate_limit_cache[user_key]
                if current_time - last_called < limit_seconds:
                    raise Exception(f"Rate limit exceeded. Try again in {limit_seconds - (current_time - last_called):.2f} seconds.")
            rate_limit_cache[user_key] = current_time
            return func(*args, **kwargs)
        return wrapper
    return decorator


def get_db_connection():
    """
    Create and return a database connection.
    """
    try:
        conn = sqlite3.connect("library.db")
        conn.row_factory = sqlite3.Row  # Enable dictionary-like row access
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        raise


@rate_limit(1)  # Limit to 1 call per second
def initialize_database():
    """
    Create the library database and table if it doesn't exist.
    """
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS library (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Database-generated unique ID
                    isbn TEXT UNIQUE,                      -- ISBN as a unique field
                    title TEXT NOT NULL,                   -- Book title
                    authors TEXT,                          -- Authors as a comma-separated string
                    description TEXT,                      -- Book description
                    cover_art TEXT,                        -- URL for the book's cover art
                    status TEXT DEFAULT 'unread'           -- Reading status: unread, read, or currently reading
                )
            """)
            conn.commit()
            print("Database initialized successfully.")
    except sqlite3.Error as e:
        print(f"Error initializing database: {e}")