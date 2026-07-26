import { useState } from "react";

import "./App.css";

import SurvivalForm from "./components/survivalForm";
import SummaryCards from "./components/summaryCards";
import SurvivalPopup from "./components/popup/SurvivalPopup";

function App() {
    const [showPopup, setShowPopup] = useState(false);
    const [prediction, setPrediction] = useState(null)

    function handleCalculate(data) {
        setPrediction(data)
        setShowPopup(true)
    }

    return (
        <div className="app">
            <div className="survival-form-container">
                <SurvivalForm onCalculate={handleCalculate}/>
            </div>
        
            <div className="summary-cards-container">
                <SummaryCards />
            </div>

            {showPopup && (<SurvivalPopup data={prediction} onClose={() => setShowPopup(false)}/>)}
        </div>
    );
}

export default App;