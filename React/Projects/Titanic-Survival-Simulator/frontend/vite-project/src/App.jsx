import { useState } from "react";

import "./App.css";

import SurvivalForm from "./components/survivalForm";
import SummaryCards from "./components/summaryCards";
import SurvivalPopup from "./components/popup/SurvivalPopup";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="app">
            <div className="survival-form-container">
                <SurvivalForm onCalculate={() => setShowPopup(true)}/>
            </div>
        
        <div className="summary-cards-container">
            <SummaryCards />
        </div>

          {showPopup && (<SurvivalPopup onClose={() => setShowPopup(false)}/>)}
        </div>
    );
}

export default App;