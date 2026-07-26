from flask import Blueprint, jsonify
from services.survival_queries import (get_survival_by_class, get_survival_by_age, get_survival_by_gender, get_survival_by_port)

survival_bp = Blueprint("survival", __name__)

@survival_bp.route("/api/insights", methods=["GET"])
def survival_by_class():

    class_results = get_survival_by_class()
    gender_results = get_survival_by_gender()
    age_results = get_survival_by_age()
    port_results = get_survival_by_port()

    class_data = []
    for row in class_results:
        class_data.append({
            "class": row[0],
            "survival_percentage": float(row[1])
        })

    gender_data = []
    for row in gender_results:
        gender_data.append({
            "gender": row[0],
            "survival_percentage": float(row[1])
        })

    age_data = []
    for row in age_results:
        age_data.append({
            "age_group": row[0],
            "survival_percentage": float(row[1])
        })

    port_data = []
    for row in port_results:
        port_data.append({
            "port": row[0],
            "survival_percentage": float(row[1])
        })

    return jsonify({
        "class": class_data,
        "gender": gender_data,
        "age": age_data,
        "port": port_data
    })

# Flask route of class, gender, age and port data