import pandas as pd

from app import app
from database.db import db
from models.passenger import Passenger

def seed_database():
    df = pd.read_csv("data/titanic.csv")

    with app.app_context():
        Passenger.query.delete()
        db.session.commit()
        
        for _, row in df.iterrows():

            age = None
            if not pd.isna(row["age"]):
                age = int(row["age"])
            # Age to be None if empty

            embarked = None
            if not pd.isna(row["embarked"]):
                embarked_lookup = {
                    "S": "Southampton",
                    "C": "Cherbourg",
                    "Q": "Queenstown"
                }

                embarked = embarked_lookup.get(
                    row["embarked"],
                    row["embarked"]
                )
            # Embarked location as full instead of initial

            sex = None
            if not pd.isna(row["sex"]):
                sex = row["sex"].capitalize()
            # Sex to be first letter capital

            family_size = None

            if not pd.isna(row["sibsp"]) and not pd.isna(row["parch"]):
                family_size = int(row["sibsp"] + row["parch"] + 1)
            # Full family size

            passenger = Passenger(
                name=row["name"],
                age=age,
                sex=sex,
                passenger_class=int(row["pclass"]),
                survived=int(row["survived"]),
                embarked=embarked,
                family_size=family_size,
            )

            db.session.add(passenger)

        db.session.commit()

        print("Database seeded successfully")

# Cleaning table rows

if __name__ == "__main__":
    seed_database()