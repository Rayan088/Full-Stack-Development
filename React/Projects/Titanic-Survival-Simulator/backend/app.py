from flask import Flask
from config import Config
from database.db import db

from models.passenger import Passenger

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)