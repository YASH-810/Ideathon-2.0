import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

def initialize_gemini():
    """Initialize the Google Gemini API with the key from the environment."""
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)

# Initialize on module import
initialize_gemini()

def detect_intent(message: str) -> str:
    """Simple keyword-based intent detection."""
    msg = message.lower()
    
    if "balance" in msg:
        return "balance"
    elif "transaction" in msg or "statement" in msg or "transactions" in msg:
        return "transactions"
    elif "loan" in msg:
        if "help" in msg or "what" in msg or "which" in msg or "how" in msg:
            return "loan_help"
        return "loan"
    elif "card" in msg:
        return "card"
    else:
        return "unknown"

def ask_gemini(prompt: str, language: str = "en") -> dict:
    """Send a prompt to Gemini and return the generated text response."""
    # Map code to language name for prompt
    lang_map = {"en": "English", "hi": "Hindi", "mr": "Marathi"}
    lang_name = lang_map.get(language, "English")

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        system_instruction = (
            f"You are ARIA, a banking kiosk assistant. "
            f"IMPORTANT: You MUST reply entirely in {lang_name}. "
            f"Keep responses short and structured. Avoid long paragraphs. "
            f"Ask questions and provide selectable options for the user. "
            f"Respond ONLY with a valid JSON object containing exactly two keys: "
            f"'reply': A string with your short response. "
            f"'options': A list of strings containing 2 to 4 short selectable options."
        )
        full_prompt = f"{system_instruction}\n\nUser Message: {prompt}"
        
        response = model.generate_content(full_prompt)
        text = response.text.replace('```json', '').replace('```', '').strip()
        data = json.loads(text)
        
        return {
            "reply": data.get("reply", "I'm not sure how to respond to that."),
            "options": data.get("options", [])
        }
    except Exception as e:
        return {
            "reply": "I'm having trouble thinking right now. Please try again later.",
            "options": ["Check Balance", "Main Menu"]
        }
