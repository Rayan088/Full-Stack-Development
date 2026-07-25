import { useState } from "react";

import "./App.css";

import SurvivalForm from "./components/SurvivalForm";
import SummaryCards from "./components/SummaryCards";
import SurvivalPopup from "./components/popup/SurvivalPopup";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="app">
            <SurvivalForm onCalculate={() => setShowPopup(true)}/>

            <SummaryCards />

            {showPopup && (<SurvivalPopup onClose={() => setShowPopup(false)}/>)}
        </div>
    );
}

export default App;