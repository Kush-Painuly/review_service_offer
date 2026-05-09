import httpx
import json
import re
from app.config.setting import OPENROUTER_API_KEY, MODEL

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def extract_json(content: str):
    try:
        return json.loads(content)

    except:
        match = re.search(r"\[.*\]", content, re.DOTALL)

        if match:
            return json.loads(match.group())

        raise ValueError("Invalid AI response format")


async def generate_reviews(prompt: str):

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",

        # REQUIRED FOR OPENROUTER
        "HTTP-Referer": "https://review-service-offer.vercel.app",
        "X-Title": "AI Review Generator"
    }

    payload = {
        "model": MODEL,

        "messages": [
            {
                "role": "system",
                "content": (
                    "You ONLY return valid JSON arrays. "
                    "No markdown. No explanation."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],

        "temperature": 0.7
    }

    last_error = None

    async with httpx.AsyncClient(timeout=30.0) as client:

        for _ in range(2):

            try:

                response = await client.post(
                    OPENROUTER_URL,
                    headers=headers,
                    json=payload
                )

                # DEBUG LOGGING
                print("STATUS:", response.status_code)
                print("BODY:", response.text)

                response.raise_for_status()

                data = response.json()

                content = data["choices"][0]["message"]["content"]

                parsed = extract_json(content)

                if not isinstance(parsed, list):
                    raise ValueError("AI response is not a list")

                return parsed[:5]

            except Exception as e:
                last_error = e
                continue

    raise Exception(f"AI request failed after retries: {last_error}")


