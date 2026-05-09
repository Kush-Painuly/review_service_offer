import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL")

BUSINESSES = {
    "abc123": {
        "name": "The Queen's Cafe",
        "category": "Restaurant",
        "keywords": ["coffee", "cozy ambience", "friendly staff"],
        "google_review_url": "https://g.page/r/XXXXX/review"
    },
    "xyz789": {
        "name": "Muscle Max Gym",
        "category": "Fitness",
        "keywords": ["equipment", "cleanliness", "trainers"],
        "google_review_url": "https://g.page/r/YYYYY/review"
    },
    "food456": {
        "name": "Spice Delight",
        "category": "Restaurant",
        "keywords": ["spicy food", "authentic taste", "quick service"],
        "google_review_url": "https://g.page/r/ZZZZZ/review"
    }
}