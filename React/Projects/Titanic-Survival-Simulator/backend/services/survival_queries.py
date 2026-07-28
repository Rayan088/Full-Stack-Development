from database.db import db
from sqlalchemy import text

def get_survival_by_class():
    query = text("""
        SELECT passenger_class,
        ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS survival_percentage
        FROM passengers
        GROUP BY passenger_class
        ORDER BY passenger_class
    """)

    result = db.session.execute(query)

    return result.fetchall()

# Query for percentage of people survived by class

def get_survival_by_gender():
    query = text("""
        SELECT sex,
        ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS survival_percentage
        FROM passengers
        GROUP BY sex;
    """)

    result = db.session.execute(query)

    return result.fetchall()

# Query for perentage of people survived by gender

def get_survival_by_age():
    query = text("""
        SELECT
            CASE
                WHEN age >= 0 AND age <= 10 THEN '0-10'
                WHEN age > 10 AND age <= 20 THEN '11-20'
                WHEN age > 20 AND age <= 30 THEN '21-30'
                WHEN age > 30 AND age <= 40 THEN '31-40'
                WHEN age > 40 AND age <= 50 THEN '41-50'
                WHEN age > 50 AND age <= 60 THEN '51-60'
                ELSE '60+'
            END AS age_group,
            ROUND(100 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2) as survival_percentage
        FROM passengers
        WHERE age IS NOT NULL
        GROUP BY age_group
        order by age_group asc
    """)

    result = db.session.execute(query)

    return result.fetchall()

# Query for percentage of people survived by age bin

def get_survival_by_port():
    query = text("""
        SELECT embarked, ROUND(100.0 * SUM(CASE WHEN survived = 1 THEN 1 ELSE 0 END) / COUNT(*), 2) AS survival_percentage
        FROM passengers
        WHERE embarked IS NOT NULL
        GROUP BY embarked;
    """)

    result = db.session.execute(query)

    return result.fetchall()

# Query for percentage of people survived by embarkment port

def get_similar_passengers(data):
    age = data["age"]
    gender = data["gender"]
    passenger_class = data["passenger_class"]
    embarked = data["embarked"]
    family_size = data["family_size"]

    query = text("""
        SELECT name, age, sex, passenger_class, embarked, family_size, survived
        FROM passengers
        WHERE sex = :gender
        AND passenger_class = :passenger_class
        AND embarked = :embarked
        ORDER BY ABS(age - :age) ASC, ABS(family_size - :family_size) ASC
        LIMIT 5
    """)

    results = db.session.execute(query, {
        "age": age,
        "gender": gender,
        "passenger_class": passenger_class,
        "embarked": embarked,
        "family_size": family_size
    })

    return results.fetchall()