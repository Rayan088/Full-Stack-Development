from flask import Blueprint, jsonify, request
from services.survival_queries import (get_survival_by_class, get_survival_by_age, get_survival_by_gender, get_survival_by_port)
from services.survival_predictor import predict_survival


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

@survival_bp.route("/api/predict", methods=["POST"])
def predict_survival_route():
    data = request.json
    result = predict_survival(data)

    return jsonify(result)

# Route for sending predicted data