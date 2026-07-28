function SummaryCards() {
    return (
        <div className="summary-cards">
            <div className="summary-card">
                <div className="summary-number">2,224</div>
                <div className="summary-label">TOTAL PASSENGERS</div>
            </div>

            <div className="summary-card">
                <div className="summary-number">1,502</div>
                <div className="summary-label">DID NOT SURVIVE</div>
            </div>

            <div className="summary-card">
                <div className="summary-number">711</div>
                <div className="summary-label">SURVIVED</div>
            </div>

            <div className="summary-card">
                <div className="summary-number">32%</div>
                <div className="summary-label">OVERRAL SURVIVAL RATE</div>
            </div>
        </div>
    );
}

export default SummaryCards;