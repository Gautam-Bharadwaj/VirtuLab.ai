"""
VirtuLab Backend Configuration
------------------------------
Manages environment variables and global constants for the backend API.
integrates seamlessly with .env files for secure credential management 
across Gemini AI, Supabase, and cross-origin resource sharing (CORS).
"""
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
PORT = int(os.getenv("PORT", "8000"))
