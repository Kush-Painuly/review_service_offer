def build_prompt(rating: int, config: dict) -> str:
    return f"""
Generate 5 unique customer review suggestions.

Business Name: {config["name"]}
Category: {config["category"]}
Rating: {rating}

Instructions:
- Max 5 lines per review
- Natural, human tone
- Include business name naturally
- Reflect rating sentiment (1 = negative, 5 = very positive)
- Avoid repetition
- Lightly incorporate keywords: {", ".join(config["keywords"])}

IMPORTANT:
- Output ONLY a valid JSON array
- No explanations
- No extra text

Example format:
[
  "Review 1...",
  "Review 2...",
  "Review 3...",
  "Review 4...",
  "Review 5..."
]
"""