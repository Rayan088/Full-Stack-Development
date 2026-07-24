from database.db import db

class Passenger(db.Model):
    __tablename__ = "passengers"

    passenger_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    sex = db.Column(db.String(10), nullable=False)
    passenger_class = db.Column(db.Integer, nullable=False)
    survived = db.Column(db.Integer, nullable=False)
    embarked = db.Column(db.String(40), nullable=True)
    family_size = db.Column(db.Integer, nullable=True)
