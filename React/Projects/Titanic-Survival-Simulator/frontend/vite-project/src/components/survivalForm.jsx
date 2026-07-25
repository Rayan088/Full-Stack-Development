function SurvivalForm({ onCalculate }) {

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
                        <input type="number" placeholder="Enter your age"/>
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select defaultValue="">
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Passenger Class</label>
                        <select defaultValue="">
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
                        <select defaultValue="">
                            <option value="" disabled>Select port</option>
                            <option value="C">Cherbourg</option>
                            <option value="Q">Queenstown</option>
                            <option value="S">Southampton</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Family Size</label>
                        <input type="number" placeholder="0"/>
                        <span className="field-hint">Including yourself</span>
                    </div>
                </div>

                <button className="calculate-btn" onClick={onCalculate}>
                    <span>CALCULATE SURVIVAL CHANCE</span>
                </button>
            </div>
        </div>
    );
}

export default SurvivalForm;