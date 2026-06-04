import { useEffect, useState } from 'react';
import './Threat_Tracker.css'
import {
    getClosestAsteroid,
    getSmallestAsteroid,
    getLargestAsteroid,
    getHazardousCount,
    getFastestAsteroid,
    getMostThreateningAsteroid
} from '../utils/asteroidCalculations'

const Threat_Tracker = () => {

    const [asteroidData, setAsteroidData] = useState(null)

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

            const closestAsteroid = getClosestAsteroid(asteroidArray);

            const smallestAsteroid = getSmallestAsteroid(asteroidArray);

            const largestAsteroid = getLargestAsteroid(asteroidArray);

            const hazardousCounter = getHazardousCount(asteroidArray);

            const fastestAsteroid = getFastestAsteroid(asteroidArray);

            const {
                asteroid: mostThreatening,
                score: highestThreatScore
            } = getMostThreateningAsteroid(asteroidArray);

            setAsteroidData({
                smallestAsteroid: smallestAsteroid,
                largestAsteroid: largestAsteroid,
                hazardousCounter: hazardousCounter,
                fastestAsteroid: fastestAsteroid,
                closestAsteroid: closestAsteroid,
                mostThreatening,
                highestThreatScore
            })

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

            <div className='dashboard'>
                <div className='stats-grid'>
                    <div className='card'>
                        <p>Closest asteroid</p>
                        <p>{asteroidData?.closestAsteroid?.name}</p>
                        <p>Distance</p>
                        <p>{Number(asteroidData?.closestAsteroid?.close_approach_data?.[0]?.miss_distance?.lunar)?.toFixed(3)} Lunar Distances</p>
                    </div>

                    <div className='card'>
                        <p>Largest Asteroid</p>
                        <p>{(
                            (asteroidData?.largestAsteroid?.estimated_diameter.kilometers.estimated_diameter_min + 
                            asteroidData?.largestAsteroid?.estimated_diameter.kilometers.estimated_diameter_max) / 2).toFixed(3)} km
                        </p>
                        <p>Diameter</p>
                    </div>

                    <div className='card'>
                        <p>Smallest Asteroid</p>
                        <p>{(
                            (asteroidData?.smallestAsteroid?.estimated_diameter.kilometers.estimated_diameter_min + 
                            asteroidData?.smallestAsteroid?.estimated_diameter.kilometers.estimated_diameter_max) / 2).toFixed(3)}
                        </p>
                        <p>Diameter</p>
                    </div>

                    <div className="card">
                        <p>Potentially hazardous</p>
                        <p>{asteroidData?.hazardousCounter}</p>
                        <p>Asteroids</p>
                    </div>

                    <div className='card'>
                        <p>Most threatening</p>
                        <p>{asteroidData?.mostThreatening?.name}</p>
                        <p>Threat score</p>
                        <p>{Math.round(asteroidData?.highestThreatScore)}/100</p>
                    </div>

                    <div className="card">
                        <p>Fastest asteroid</p>
                        <p>{asteroidData?.fastestAsteroid?.toFixed(3)} km/h</p>
                        <p>Velocity</p>
                    </div>
                </div>

                <div className='charts-section'>
                    <div className='top-charts'>
                        <div className='chart-box'>
                            <p>Asteroids per day</p>
                        </div>

                        <div className='chart-box pie-chart'>
                            <p>Hazardous vs Safe</p>
                        </div>

                        <div className='chart-box wide-chart'>
                            <p>Velocity Distribution</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Threat_Tracker;