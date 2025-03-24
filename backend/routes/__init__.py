from .library_routes import library_bp
from .gapi_routes import gapi_bp
from .bs_routes import bs_scrape_bp

# Expose the blueprints for easy import
__all__ = [
    "library_bp",
    "gapi_bp",
    "bs_scrape_bp",
]