import { useState } from "react";
import { getSurvivalPercentage, getSimilarPassengers, getGeminiSummary} from "../api/api"

function SurvivalForm({ onCalculate }) {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        passenger_class: "",
        embarked: "",
        family_size: ""
    })

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit() {
        const passengerData = {
            ...formData,
            age: Number(formData.age),
            passenger_class: Number(formData.passenger_class),
            family_size: Number(formData.family_size)
        };

        const survival = await getSurvivalPercentage(passengerData);
        const passengers = await getSimilarPassengers(passengerData);
        const summary = await getGeminiSummary(passengerData);

        onCalculate({
            survival_percentage: survival.survival_percentage,
            similar_passengers: passengers,
            summary: summary.summary
        });
    }

    return (
        <div className="survival-page">
            <div className="form-header">
                <h1 className="form-title">Would You Have <br /> Survived The Titanic?</h1>
                <p className="form-subtitle">
                    Step into history. Enter your details below and discover <br /> your fate based on real data from April 15, 1912.
                </p>
            </div>

            <div className="survival-form">
                <div className="form-row form-row-3">
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age"/>
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Passenger Class</label>
                        <select name="passenger_class" value={formData.passenger_class} onChange={handleChange}>
                            <option value="" disabled>Select class</option>
                            <option value="1">1st Class</option>
                            <option value="2">2nd Class</option>
                            <option value="3">3rd Class</option>
                        </select>
                    </div>
                </div>

                <div className="form-row form-row-2">
                    <div className="form-group">
                        <label>Embarkation Port</label>
                        <select name="embarked" value={formData.embarked} onChange={handleChange}>
                            <option value="" disabled>Select port</option>
                            <option value="C">Cherbourg</option>
                            <option value="Q">Queenstown</option>
                            <option value="S">Southampton</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Family Size</label>
                        <input type="number" name="family_size" value={formData.family_size} onChange={handleChange} placeholder="0"/>
                        <span className="field-hint">Including yourself</span>
                    </div>
                </div>

                <button type="button" className="calculate-btn" onClick={handleSubmit}>
                    <span>CALCULATE SURVIVAL CHANCE</span>
                </button>
            </div>
        </div>
    );
}

export default SurvivalForm;