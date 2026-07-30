import SurvivalChance from "./survivalChance";
import GeminiExplanation from "./geminiExplanation";
import SimilarPassengers from "./similarPassengers";

import AgeChart from "./visualisations/ageChart";
import ClassChart from "./visualisations/classChart";
import GenderChart from "./visualisations/genderChart";
import PortChart from "./visualisations/portChart";

function SurvivalPopup({ data, onClose }) {
    if (!data) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>✕</button>

                <div className="popup-header">
                    <div className="popup-card">
                        <SurvivalChance probability={data.survival_percentage}/>
                    </div>
                    
                    <div className="popup-card">
                        <GeminiExplanation summary={data.summary}/>
                    </div>
                </div>

                <div className="popup-body">
                    <div className="popup-card">
                        <SimilarPassengers passengers={data.similar_passengers}/>
                    </div>

                    <div className="popup-graphs">
                        <div className="popup-card">
                            <ClassChart />
                        </div>

                        <div className="popup-card">
                            <GenderChart />
                        </div>

                        <div className="popup-card">
                            <AgeChart />
                        </div>

                        <div className="popup-card">
                            <PortChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SurvivalPopup;