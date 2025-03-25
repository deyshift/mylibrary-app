from flask import Flask
from flask_cors import CORS
from routes import library_bp, gapi_bp, bs_scrape_bp
from database.db import initialize_database  # Import the database initialization function
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get CORS origin from environment variables
CORS_ORIGIN = os.getenv("CORS_ORIGIN")
CORS(app, origins=[CORS_ORIGIN])

# Initialize the database
initialize_database()

# Register blueprints
app.register_blueprint(library_bp)
app.register_blueprint(gapi_bp)
app.register_blueprint(bs_scrape_bp)

if __name__ == "__main__":
    app.run(debug=True)  # Start the Flask application