from flask import Flask
from flask_cors import CORS
from routes import library_bp, gapi_bp, bs_scrape_bp 

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Register blueprints
app.register_blueprint(library_bp)
app.register_blueprint(gapi_bp)
app.register_blueprint(bs_scrape_bp)

if __name__ == "__main__":
    app.run(debug=True)    # Start the Flask application