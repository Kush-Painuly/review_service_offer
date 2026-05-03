from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.review_routes import router as review_router

app = FastAPI(title="AI Review Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://review-service-offer.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "ok"}

app.include_router(review_router)