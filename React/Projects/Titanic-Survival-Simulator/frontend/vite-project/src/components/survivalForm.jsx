function SurvivalForm({ onCalculate }) {

    return (
        <div className="survival-form">
            <div className="form-group">
                <label>Age</label>
                <input type="number" placeholder="Enter your age"/>
            </div>

            <div className="form-group">
                <label>Gender</label>
                <select>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div className="form-group">
                <label>Passenger Class</label>
                <select>
                    <option value="">Select class</option>
                    <option value="1">First Class</option>
                    <option value="2">Second Class</option>
                    <option value="3">Third Class</option>
                </select>
            </div>

            <div className="form-group">
                <label>Embarkation Port</label>
                <select>
                    <option value="">Select port</option>
                    <option value="C">Cherbourg</option>
                    <option value="Q">Queenstown</option>
                    <option value="S">Southampton</option>
                </select>
            </div>

            <div className="form-group">
                <label>Family Size</label>
                <input type="number" placeholder="Number of family members"/>
            </div>

            <button onClick={onCalculate}>
                Calculate Survival
            </button>
        </div>
    );
}

export default SurvivalForm;