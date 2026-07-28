from flask import Blueprint, jsonify, request
from services.survival_queries import (get_survival_by_class, get_survival_by_age, get_survival_by_gender, get_survival_by_port, get_similar_passengers)
from services.survival_predictor import calculate_survival
from services.gemini_summary import generate_summary

survival_bp = Blueprint("survival", __name__)

@survival_bp.route("/api/insights/class", methods=["GET"])
def survival_by_class():
    results = get_survival_by_class()

    data = []
    for row in results:
        data.append({
            "class": row[0],
            "survival_percentage": float(row[1])
        })

    return jsonify(data)

# Route for survival by class

@survival_bp.route("/api/insights/gender", methods=["GET"])
def survival_by_gender():
    results = get_survival_by_gender()

    data = []
    for row in results:
        data.append({
            "gender": row[0],
            "survival_percentage": float(row[1])
        })

    return jsonify(data)

# Route for survival by gender

@survival_bp.route("/api/insights/age", methods=["GET"])
def survival_by_age():
    results = get_survival_by_age()

    data = []
    for row in results:
        data.append({
            "age_group": row[0],
            "survival_percentage": float(row[1])
        })

    return jsonify(data)

# Route for survival by age

@survival_bp.route("/api/insights/port", methods=["GET"])
def survival_by_port():
    results = get_survival_by_port()

    data = []
    for row in results:
        data.append({
            "port": row[0],
            "survival_percentage": float(row[1])
        })

    return jsonify(data)

# Route for survival by embarkment port

@survival_bp.route("/api/stats/survival-percentage", methods=["POST"])
def predict_survival():
    data = request.get_json()

    survival_percentage = calculate_survival(data)

    return jsonify({"survival_percentage": survival_percentage})

# Route for calculating survival percentage

@survival_bp.route("/api/stats/similar-passengers", methods=["POST"])
def similar_passengers():
    data = request.get_json()

    passengers = get_similar_passengers(data)

    return jsonify(passengers)

# Route for retrieving similar passengers

@survival_bp.route("/api/stats/gemini-summary", methods=["POST"])
def gemini_summary():
    data = request.get_json()
    survival_percentage = calculate_survival(data)

    summary = generate_summary(data, survival_percentage)

    return jsonify({"summary": summary})

# Route for generating Gemini summary