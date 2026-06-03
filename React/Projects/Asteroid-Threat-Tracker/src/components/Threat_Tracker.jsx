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
        <>
            <div className='page'>
                <div className='title'>
                    <p>Asteroid Threat Tracker</p>
                </div>

                <div className='date'>
                    <p>Date: 03 June 2026</p>
                </div>
            </div>

            <div className='content'>
                <div className='grid'>
                    <div className='card'>
                        <p>Closest asteroid</p>
                        <p>Astroid Name</p>
                        <p>Distance</p>
                        <p>100000 Km</p>
                    </div>

                    <div className='card'>
                        <p>Largest Asteroid</p>
                        <p>50 KM</p>
                        <p>Diameter</p>
                    </div>

                    <div className='card'>
                        <p>Smallest Asteroid</p>
                        <p>0.012 Km</p>
                        <p>Diameter</p>
                    </div>

                    <div className="card">
                        <p>Potentially hazardous</p>
                        <p>21</p>
                        <p>Asteroids</p>
                    </div>

                    <div className='card'>
                        <p>Most threatening</p>
                        <p>Asteroid Name</p>
                        <p>Threat score</p>
                        <p>89.7/100</p>
                    </div>

                    <div className="card">
                        <p>Fastest asteroid</p>
                        <p>126.540 km/h</p>
                        <p>Velocity</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Threat_Tracker;