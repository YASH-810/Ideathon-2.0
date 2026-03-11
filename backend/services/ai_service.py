import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

GEMINI_API_KEYS = ["AIzaSyCA5DIoYR1Xtq0TUGcAXR_JugkqPObQ6ZY","AIzaSyC5qpmc3luehSu1EXfGfrSkkRRKkkHQDzE","AIzaSyDALZEiYwnw-DDPQUtCvkQ_336uuCcy6x0","AIzaSyALLRmVlrhEHI0NVF3QoyxEj5gYWHU-cqg","AIzaSyBBFh37nPpSA3vd6t4AzjqnifeiKm2ZTeY"]
active_key_index = 0
exhausted_keys = set()

def initialize_gemini():
    """Load multiple Gemini API keys from the environment."""
    global GEMINI_API_KEYS
    
    # Start with any already hardcoded keys so they aren't lost
    keys = list(GEMINI_API_KEYS) if GEMINI_API_KEYS else []
    
    for i in range(1, 6):
        key = os.getenv(f"GEMINI_API_KEY_{i}")
        if key and key.strip() and key.strip() not in keys:
            keys.append(key.strip())
            
    # Also support a comma separated list
    env_keys_str = os.getenv("ENV_KEYS_STRING", "")
    if env_keys_str:
        for k in env_keys_str.split(","):
            if k.strip() and k.strip() not in keys:
                keys.append(k.strip())
                
    # Fallback to default
    if not keys:
        default_key = os.getenv("GEMINI_API_KEY")
        if default_key and default_key.strip() not in keys:
            keys.append(default_key.strip())
            
    GEMINI_API_KEYS = keys

# Initialize on module import
initialize_gemini()

def detect_topic(message: str) -> str:
    """Detect the main banking topic of the user's message."""
    msg = message.lower()
    if "balance" in msg:
        return "balance"
    elif "loan" in msg:
        return "loan"
    elif "transaction" in msg or "statement" in msg:
        return "transactions"
    elif "card" in msg:
        return "card_services"
    elif "pay" in msg or "upi" in msg or "digital" in msg:
        return "digital_payments"
    else:
        return "general"

def ask_gemini(prompt: str, language: str = "en", topic: str = "general") -> dict:
    """Send a prompt to Gemini and return the generated text response."""
    global active_key_index
    if not GEMINI_API_KEYS:
        return {"error": "AI service temporarily unavailable. No API keys configured."}
        
    # Map code to language name for prompt
    lang_map = {"en": "English", "hi": "Hindi", "mr": "Marathi"}
    lang_name = lang_map.get(language, "English")

    system_instruction = (
        f"You are ARIA, a banking kiosk assistant.\n"
        f"The user is currently in the {topic.upper()} conversation flow.\n"
        f"IMPORTANT RULES:\n"
        f"1. Only provide information related to {topic}.\n"
        f"2. Do NOT recommend other banking services.\n"
        f"3. Do NOT suggest digital payments, UPI, or unrelated features.\n"
        f"4. Keep responses short and guided.\n"
        f"5. Provide selectable options when possible.\n"
        f"6. Respond ONLY in JSON format with 'reply' and 'options'.\n"
        f"IMPORTANT: You MUST reply entirely in {lang_name}."
    )
    full_prompt = f"{system_instruction}\n\n{prompt}"
    
    start_index = active_key_index
    for i in range(len(GEMINI_API_KEYS)):
        current_index = (start_index + i) % len(GEMINI_API_KEYS)
        current_key = GEMINI_API_KEYS[current_index]
        
        # Skip keys that have permanently failed this session
        if current_key in exhausted_keys:
            continue
            
        genai.configure(api_key=current_key)
        
        try:
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(full_prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            data = json.loads(text)
            
            # Successful generation, update active key
            active_key_index = current_index
            
            return {
                "reply": data.get("reply", "I'm not sure how to respond to that."),
                "options": data.get("options", [])
            }
        except Exception as e:
            err_msg = str(e).lower()
            print(f"Error with API Key index {current_index}: {err_msg}")
            
            if "quota" in err_msg or "rate limit" in err_msg or "429" in err_msg:
                # Mark as exhausted
                print("Quota exceeded or limit reached. Marking key as exhausted and switching to backup.")
                exhausted_keys.add(current_key)
            else:
                print("AI key failed. Switching to backup key.")
            continue
            
    # If all keys fail
    return {
        "error": "All AI services are temporarily unavailable"
    }

def translate_response(data: dict, language: str) -> dict:
    """Translate a response dict into the requested language."""
    if language == "en" or "error" in data:
        return data
        
    lang_map = {"hi": "Hindi", "mr": "Marathi"}
    lang_name = lang_map.get(language, "English")
    
    if lang_name == "English":
        return data

    global active_key_index
    if not GEMINI_API_KEYS:
        return data
        
    system_instruction = (
        f"You are a professional banking translator. "
        f"Translate the following JSON object to {lang_name}. "
        f"The object contains a 'reply' string and an 'options' array. "
        f"IMPORTANT: Keep exactly the same JSON structure. Only translate the text values. "
        f"Respond ONLY with a valid JSON object containing exactly two keys ('reply' and 'options')."
    )
    full_prompt = f"{system_instruction}\n\nData to translate: {json.dumps(data)}"
    
    start_index = active_key_index
    for i in range(len(GEMINI_API_KEYS)):
        current_index = (start_index + i) % len(GEMINI_API_KEYS)
        current_key = GEMINI_API_KEYS[current_index]
        
        if current_key in exhausted_keys:
            continue
            
        genai.configure(api_key=current_key)
        
        try:
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(full_prompt)
            text = response.text.replace('```json', '').replace('```', '').strip()
            translated_data = json.loads(text)
            
            active_key_index = current_index
            
            return {
                "reply": translated_data.get("reply", data.get("reply")),
                "options": translated_data.get("options", data.get("options"))
            }
        except Exception as e:
            err_msg = str(e).lower()
            print(f"Translation Error with API Key {current_index}: {err_msg}")
            
            if "quota" in err_msg or "rate limit" in err_msg or "429" in err_msg:
                exhausted_keys.add(current_key)
                
            continue
            
    return data  # Fallback to original text on error

def generate_suggestions(user: dict) -> dict:
    """Analyze user data and return proactive financial suggestions."""
    if not user:
        return None
        
    balance = user.get("account", {}).get("balance", 0)
    
    # 1. Balance-based suggestion
    if balance > 100000:
        return {
            "reply": "You may benefit from opening a Fixed Deposit to earn interest.",
            "options": ["Open Fixed Deposit", "Tell Me More"]
        }
        
    # 2. Transaction analysis (frequent withdrawals)
    transactions = user.get("transactions", [])
    cash_withdrawals = 0
    for t in transactions:
        desc = t.get("description", "").lower()
        if t.get("type") == "debit" or "withdraw" in desc or "atm" in desc:
            cash_withdrawals += 1
            
    if cash_withdrawals >= 1:
        return {
            "reply": "You frequently withdraw cash.\nWould you like to enable digital payments like UPI?",
            "options": ["Enable UPI", "Tell Me More"]
        }
        
    return None
