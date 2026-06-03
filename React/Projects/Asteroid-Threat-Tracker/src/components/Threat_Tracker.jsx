import { useEffect } from 'react';
import './Threat_Tracker.css'

const Threat_Tracker = () => {
    const fetchAsteroids = async () => {
        const apiKey = import.meta.env.VITE_APP_ID;

        const startDate = new Date().toISOString().split('T')[0]; // Gets todays date in appropriate format

        try {
            const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return
            }

            // Converting data into an array
            const asteroidArray = Object.values(data.near_earth_objects).flat();
            console.log("ALL ASTEROIDS:", asteroidArray);

        } catch (error) {
            console.log(`Error fetching Asteroid data: ${error}`)
        }
    }

    useEffect(() => {
        fetchAsteroids();
    }, [])

    return (
        <div>
            <h1>Asteroid Threat Tracker</h1>
        </div>
    )
}

export default Threat_Tracker;