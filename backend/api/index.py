"""FastAPI serverless function for Vercel deployment.

This module serves as the entry point for the F1 classification API
when deployed to Vercel as a serverless function.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from .classification import get_classification

# Initialize FastAPI app
app = FastAPI(
    title="F1 2025 Classification API",
    description="API for F1 driver classification with feature flag support",
    version="1.0.0",
)

# Enable CORS for frontend (separate Vercel deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://frontend-psi-liart-27.vercel.app",  # Production frontend
        "https://*.vercel.app",  # Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "F1 2025 Classification API",
        "version": "1.0.0",
        "endpoints": {"/api/classification": "Get F1 driver classification"},
    }


@app.get("/api/classification")
async def classification():
    """Get F1 2025 driver classification.

    Returns:
        JSON array with driver classification data including position,
        name, team, and points. If RUBINHO_CAMPEAO feature flag is enabled,
        Rubinho Barrichello appears as champion.
    """
    return {"data": get_classification()}


# Mangum handler for Vercel serverless deployment
handler = Mangum(app)
