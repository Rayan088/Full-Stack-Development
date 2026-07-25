import { useState } from "react";

import "./App.css";

import SurvivalForm from "./components/SurvivalForm";
import SummaryCards from "./components/SummaryCards";
import SurvivalPopup from "./components/popup/SurvivalPopup";

function App() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="app">
          <h1>Would you Have survived the titanic</h1>
          <h2>Step into history. Enter your details below and discover your chances based on real data from April 15 1912.</h2>

          <SurvivalForm onCalculate={() => setShowPopup(true)}/>

          <SummaryCards />

          {showPopup && (<SurvivalPopup onClose={() => setShowPopup(false)}/>)}
        </div>
    );
}

export default App;