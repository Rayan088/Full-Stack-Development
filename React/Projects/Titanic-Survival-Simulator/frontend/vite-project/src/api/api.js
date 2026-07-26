const API = "http://127.0.0.1:5000/api";

export async function getClassInsights() {
    const response = await fetch(`${API}/insights/class`)

    if (!response.ok) {
        throw new Error("Failed to fetch class insights")
    }
    
    return await response.json()
}

export async function getGenderInsights() {
    const response = await fetch(`${API}/insights/gender`);

    if (!response.ok) {
        throw new Error("Failed to fetch gender insights.");
    }

    return await response.json();
}

export async function getAgeInsights() {
    const response = await fetch(`${API}/insights/age`);

    if (!response.ok) {
        throw new Error("Failed to fetch age insights.");
    }

    return await response.json();
}

export async function getPortInsights() {
    const response = await fetch(`${API}/insights/port`);

    if (!response.ok) {
        throw new Error("Failed to fetch embarkation port insights.");
    }

    return await response.json();
}

// Routes to fetch api endpoints with error messages

export async function predictSurvival(passengerData) {
    const response = await fetch (`${API}/predict`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify(passengerData)
    })

    if (!response.ok) {
        throw new Error("Failed to calculate survival probabilities")
    }

    return await response.json()
}

// Route to send form data to backend