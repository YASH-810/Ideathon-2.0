from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import banking_service, ai_service

app = FastAPI(title="Banking Kiosk API")

# Enable CORS for the frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust for production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class PinRequest(BaseModel):
    card_number: str
    pin: str

@app.post("/auth/pin")
def verify_pin(request: PinRequest):
    user = banking_service.verify_pin(request.card_number, request.pin)
    if user:
        return {
            "status": "success",
            "user_id": user["id"],
            "name": user["name"]
        }
    raise HTTPException(status_code=401, detail="Invalid card number or PIN")

@app.get("/users")
def get_users():
    data = banking_service.load_bank_data()
    users = []
    for user in data.get("users", []):
        users.append({
            "id": user["id"],
            "name": user["name"],
            "card_number": user["card_number"]
        })
    return users

@app.get("/balance/{user_id}")
def get_balance(user_id: int):
    balance = banking_service.get_balance(user_id)
    if balance is not None:
        return {"balance": balance}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/transactions/{user_id}")
def get_transactions(user_id: int):
    transactions = banking_service.get_transactions(user_id)
    if transactions is not None:
        return transactions
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/user/{user_id}")
def get_user_details(user_id: int):
    user = banking_service.get_user_by_id(user_id)
    if user:
        # Don't return the PIN in user details response
        user_copy = dict(user)
        user_copy.pop("pin", None)
        return user_copy
    raise HTTPException(status_code=404, detail="User not found")

class AssistantRequest(BaseModel):
    message: str
    user_id: int
    language: str = None

@app.post("/assistant")
def assistant_endpoint(request: AssistantRequest):
    intent = ai_service.detect_intent(request.message)
    lang = request.language if request.language else "en"
    
    # Internal text mappers
    t_bal = {
        "en": "Your account balance is \u20b9{}.",
        "hi": "आपके खाते का बैलेंस \u20b9{} है।",
        "mr": "तुमच्या खात्यावरील शिल्लक \u20b9{} आहे."
    }
    t_no_acc = {
        "en": "I couldn't find your account details.",
        "hi": "मुझे आपके खाते का विवरण नहीं मिला।",
        "mr": "मला तुमचे खाते तपशील सापडले नाहीत."
    }
    t_no_txn = {
        "en": "You have no recent transactions.",
        "hi": "आपके पास कोई हालिया लेनदेन नहीं है।",
        "mr": "तुमचे कोणतेही अलीकडील व्यवहार नाहीत."
    }
    t_txn = {
        "en": "Your last transaction was a {} of \u20b9{} for '{}' on {}.",
        "hi": "आपका अंतिम लेनदेन {} को '{}' के लिए \u20b9{} का {} था।",
        "mr": "तुमचा शेवटचा व्यवहार {} रोजी '{}' साठी \u20b9{} चा {} होता." # Date, Desc, Amount, Type
    }

    # Static options mapper
    opts = {
        "balance": {"en": ["Show Transactions", "Main Menu"], "hi": ["लेनदेन दिखाएं", "मुख्य मेनू"], "mr": ["व्यवहार दाखवा", "मुख्य मेनू"]},
        "try": {"en": ["Try Again", "Main Menu"], "hi": ["पुनः प्रयास करें", "मुख्य मेनू"], "mr": ["पुन्हा प्रयत्न करा", "मुख्य मेनू"]}
    }

    opt_bal = opts["balance"].get(lang, opts["balance"]["en"])
    opt_try = opts["try"].get(lang, opts["try"]["en"])

    if intent == "balance":
        balance = banking_service.get_balance(request.user_id)
        if balance is not None:
            return {"reply": t_bal.get(lang, t_bal["en"]).format(balance), "options": opt_bal}
        else:
            return {"reply": t_no_acc.get(lang, t_no_acc["en"]), "options": opt_try}
            
    elif intent == "transactions":
        transactions = banking_service.get_transactions(request.user_id)
        if transactions is not None:
            if not transactions:
                return {"reply": t_no_txn.get(lang, t_no_txn["en"]), "options": opt_bal}
            latest = transactions[-1]
            typ = latest.get('type', 'transaction')
            amt = latest.get('amount', 0)
            desc = latest.get('description', 'Unknown')
            dt = latest.get('date', '')
            
            if lang == "en":
                reply = t_txn["en"].format(typ, amt, desc, dt)
            elif lang == "hi":
                reply = t_txn["hi"].format(dt, desc, amt, typ)
            else:
                reply = t_txn["mr"].format(dt, desc, amt, typ)
                
            return {"reply": reply, "options": opt_bal}
        else:
            return {"reply": t_no_acc.get(lang, t_no_acc["en"]), "options": opt_bal}
            
    else:
        # intents: loan, loan_help, card, unknown
        reply_data = ai_service.ask_gemini(request.message, language=lang)
        return reply_data
