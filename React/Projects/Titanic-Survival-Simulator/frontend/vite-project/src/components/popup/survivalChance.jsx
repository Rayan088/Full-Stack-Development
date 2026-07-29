function SurvivalChance({ probability }) {
    return (
        <div className="popup-card survival-card">
            <div className="survival-percentage">
                {probability}%
            </div>

            <p>CHANCE OF SURVIVAL</p>
        </div>
    );
}

export default SurvivalChance;