from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import banking_service, ai_service

app = FastAPI(title="Banking Kiosk API")

sessions = {}

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
    user_id_str = str(request.user_id)
    if user_id_str not in sessions:
        sessions[user_id_str] = {"history": [], "topic": "general"}
        
    session = sessions[user_id_str]
    history = session.setdefault("history", [])
    previous_topic = session.setdefault("topic", "general")

    lang = request.language if request.language else "en"
    
    # Topic Tracking and Context Isolation
    new_topic = ai_service.detect_topic(request.message)
    
    if new_topic != "general" and new_topic != previous_topic:
        # Context reset because topic changed
        history = []
        session["topic"] = new_topic
    elif new_topic == "general":
        # Keep flowing if the user just responds generally within the current flow
        new_topic = previous_topic
        
    # Retrieve User Banking Data
    user = banking_service.get_user_by_id(request.user_id)
    banking_data_str = "Banking Data: Not available."
    if user:
        if new_topic == "loan":
            banking_data_str = (
                "Current topic: loan\n"
                "Available loan services: Home Loan, Personal Loan, Car Loan, Education Loan.\n"
                "Do NOT include balance, transactions, or unrelated suggestions."
            )
        elif new_topic == "card_services":
            banking_data_str = (
                "Current topic: card_services\n"
                "Available card services: Block Card, Replace Card, Check Card Limit, Card Activation.\n"
                "Do NOT include balance, transactions, or unrelated suggestions."
            )
        else:
            balance = user.get("account", {}).get("balance", "Unknown")
            transactions = user.get("transactions", [])
            banking_data_str = f"User Banking Data:\n- Balance: \u20b9{balance}\n- Transactions: {transactions}"
            
            # Include suggestions in prompt context if applicable
            suggestion = ai_service.generate_suggestions(user)
            if suggestion:
                banking_data_str += f"\n\nSystem Notice: Provide these financial suggestions and options: {suggestion['reply']} | Options: {suggestion['options']}"
            
    # Append the latest user message
    history.append({"role": "User", "content": request.message})
    history = history[-10:] # Keep last 10 messages for memory limits
    
    # Construct complete prompt
    conv_history_str = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    
    prompt = (
        f"{banking_data_str}\n\n"
        f"Conversation History:\n{conv_history_str}\n\n"
        f"Based on the conversation history and banking data, generate the next response. "
        f"If the user asks for their balance or transactions, use the data provided above. Include all suggested options."
    )
    
    # Always call Gemini to generate the structured response
    response_data = ai_service.ask_gemini(prompt, language="en", topic=new_topic)
    
    if "error" in response_data:
        return response_data
    
    # Append assistant's response to history
    history.append({"role": "ARIA", "content": response_data.get("reply", "")})
    session["history"] = history
    sessions[user_id_str] = session
    
    # Translate automatically if needed
    if lang != "en":
        response_data = ai_service.translate_response(response_data, lang)
        
    return response_data
