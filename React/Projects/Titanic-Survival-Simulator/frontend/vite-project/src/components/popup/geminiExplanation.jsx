function GeminiExplanation({ summary }) {
    return (
        <div className="popup-card gemini-card">
            <div className="card-header">
                <h2>HISTORICAL EXPLANATION</h2>
            </div>

            <p className="gemini-text">{summary}</p>
        </div>
    );
}

export default GeminiExplanation;