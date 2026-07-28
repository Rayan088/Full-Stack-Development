from google import genai

from config import Config
client = genai.Client(api_key=Config.GEMINI_API_KEY)

def generate_summary(data, survival_percentage):
    prompt = f"""
    You are a Titanic historian writing a short concise historical explanation
    for a passenger's estimated fate aboard the Titanic.

    Passenger Profile:
    - Age: {data["age"]}
    - Gender: {data["gender"]}
    - Passenger Class: {data["passenger_class"]}
    - Embarkation Port: {data["embarked"]}
    - Family Size: {data["family_size"]}

    Calculated survival Percentage: {survival_percentage}%

    Interpret the survival percentage as follows:
    - 0 to 34%: low chance of survival
    - 35 to 60%: Fair chance of survival 
    - 60 to 79%: Good chance of survival
    - 80 to 100%: Very high chance of survival

    Begin your response with a sentence following this structure:
    "As a 25 year old male travelling in 3rd class from Southampton with no family, your chances of survival are low"

    After the opening sentence, include one additional sentence explaining the historical reasons for the estimated outcome.
    
    Keep the entire response under 50 words.
    Do not invent statistics.
    Do not mention artificial intelligence, machine learning or Gemini.
    Do not recalculate the survival percentage or include the percentage value in your message.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text

# Gemini prompt for generating passenger summary