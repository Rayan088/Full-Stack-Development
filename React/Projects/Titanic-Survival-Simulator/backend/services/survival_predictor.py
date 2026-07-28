from database.db import db
from sqlalchemy import text

def get_gender_survival(gender):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE sex = :gender
    """)

    result = db.session.execute(query, {"gender": gender})

    return result.scalar()

# Query for percentage survived by user inputted gender

def get_passenger_class_survival(passenger_class):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE passenger_class= :passenger_class
    """)

    result = db.session.execute(query, {"passenger_class": passenger_class})

    return result.scalar()

# Query for percentage survived by user inputted passenger class

def get_family_size_survival(family_size):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE family_size = :family_size
    """)

    result = db.session.execute(query, {"family_size": family_size})

    return result.scalar()

# Query for percentage survived by user inputted family size

def get_embarked_survival(embarked):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE embarked = :embarked
    """)

    result = db.session.execute(query, {"embarked": embarked})

    return result.scalar()

# Query for percentage survived by user inputted embarkation port

def get_age_survival(age):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE age BETWEEN (:age - 7) AND (:age + 7)
    """)

    result = db.session.execute(query, {"age": age})

    return result.scalar()

# Query for percentage survived by user inputted age

def get_gender_class_survival(gender, passenger_class):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE sex = :gender
        AND passenger_class = :passenger_class
    """)

    result = db.session.execute(query, {"gender": gender, "passenger_class": passenger_class})

    return result.scalar()

# Query for percentage survived by gender and passenger class

def get_gender_age_survival(gender, age):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE sex = :gender
        AND age BETWEEN (:age - 7) AND (:age + 7)
    """)

    result = db.session.execute(query, {"gender": gender, "age": age})

    return result.scalar()

# Query for percentage survived by gender and age

def get_class_age_survival(passenger_class, age):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE passenger_class = :passenger_class
        AND age BETWEEN (:age - 7) AND (:age + 7)
    """)

    result = db.session.execute(query, {"passenger_class": passenger_class, "age": age})

    return result.scalar()

# Query for percentage survived by passenger class and age

def get_class_familysize_survival(passenger_class, family_size):
    query = text("""
        SELECT ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2)
        FROM passengers
        WHERE passenger_class = :passenger_class
        AND family_size = :family_size
    """)

    result = db.session.execute(query, {"passenger_class": passenger_class, "family_size": family_size})

    return result.scalar()

# Query for percentage survived by passenger class and family size

def calculate_survival(data):

    gender = data["gender"]
    passenger_class = data["passenger_class"]
    age = data["age"]
    family_size = data["family_size"]
    embarked = data["embarked"]

    gender_score = get_gender_survival(gender)
    class_score = get_passenger_class_survival(passenger_class)
    family_score = get_family_size_survival(family_size)
    embarked_score = get_embarked_survival(embarked)
    age_score = get_age_survival(age)

    gender_class_score = get_gender_class_survival(gender, passenger_class)
    gender_age_score = get_gender_age_survival(gender, age)
    class_age_score = get_class_age_survival(passenger_class, age)
    class_family_score = get_class_familysize_survival(passenger_class, family_size)

    survival_probability = (
        gender_score * 0.11 +
        class_score * 0.10 +
        family_score * 0.05 +
        embarked_score * 0.05 +
        age_score * 0.05 +

        gender_class_score * 0.23 +
        gender_age_score * 0.15 +
        class_age_score * 0.15 +
        class_family_score * 0.11
    )

    return {"survival_probability": int(round(survival_probability))}

# Returns calculation of survival