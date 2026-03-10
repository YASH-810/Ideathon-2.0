import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'bank_data.json')

def load_bank_data():
    """Load user data from the JSON database file."""
    try:
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"users": []}

def get_user_by_card(card_number):
    """Find a user by their card number."""
    data = load_bank_data()
    for user in data.get("users", []):
        if user["card_number"] == card_number:
            return user
    return None

def get_user_by_id(user_id):
    """Find a user by their ID."""
    data = load_bank_data()
    for user in data.get("users", []):
        if user["id"] == user_id:
            return user
    return None

def verify_pin(card_number, pin):
    """Verify a user's pin using card number."""
    user = get_user_by_card(card_number)
    if user and user["pin"] == pin:
        return user
    return None

def get_balance(user_id):
    """Get the account balance for a user ID."""
    user = get_user_by_id(user_id)
    if user:
        return user.get("account", {}).get("balance", 0)
    return None

def get_transactions(user_id):
    """Get user transactions."""
    user = get_user_by_id(user_id)
    if user:
        return user.get("transactions", [])
    return None
