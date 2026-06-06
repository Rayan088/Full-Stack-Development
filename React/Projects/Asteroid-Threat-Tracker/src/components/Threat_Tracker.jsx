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

import asteroidImg1 from '../assets/asteroid_1.png'
import asteroidImg2 from '../assets/asteroid_2.png'
import asteroidImg3 from '../assets/asteroid_3.png'
import dangerLogo from '../assets/danger_logo.png'
import threatLogo from '../assets/threat_logo.png'
import speedLogo from '../assets/speed_logo.png'

import AsteoidsPerDayChart from './charts/AsteroidsPerDayChart'
import HazardDistributionChart from './charts/HazardDistributionChart';
import VelocityDistributionChart from './charts/VelocityDistributionChart';

import {getAsteroidsPerDay, getHazardousAsteroids, getVelocityDistribution} from '../utils/chartData';

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

            const asteroidsPerDay = getAsteroidsPerDay(asteroidArray);
            const hazardousAsteroids = getHazardousAsteroids(asteroidArray);
            const velocityDistribution = getVelocityDistribution(asteroidArray);

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
                smallestAsteroid,
                largestAsteroid,
                hazardousCounter,
                fastestAsteroid,
                closestAsteroid,
                mostThreatening,
                highestThreatScore,

                asteroidsPerDay,
                hazardousAsteroids,
                velocityDistribution
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
                    <p>Date: {new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}</p>
                </div>
            </div>

            <div className='dashboard'>
                <div className='stats-grid'>

                    <div className='card'>
                        <div className='card-inner'>
                            <img className='data-img' src={asteroidImg1} alt="Asteroid Image" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Closest asteroid</p>
                                <p className='sub-title-data'>{asteroidData?.closestAsteroid?.name}</p>
                                <p className='sub-title-info'>Distance</p>
                                <p className='sub-title-data2'>{Number(asteroidData?.closestAsteroid?.close_approach_data?.[0]?.miss_distance?.lunar)?.toFixed(3)} LD</p>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-inner'>
                            <img className='data-img' src={asteroidImg2} alt="Asteroid Image" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Largest Asteroid</p>
                                <p className='sub-title-data'>{(
                                    (asteroidData?.largestAsteroid?.estimated_diameter.kilometers.estimated_diameter_min + 
                                    asteroidData?.largestAsteroid?.estimated_diameter.kilometers.estimated_diameter_max) / 2).toFixed(3)} km
                                </p>
                                <p className='sub-title-info'>Diameter</p>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-inner'>
                            <img className='data-img' src={asteroidImg3} alt="Asteroid Image" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Smallest Asteroid</p>
                                <p className='sub-title-data'>{(
                                    (asteroidData?.smallestAsteroid?.estimated_diameter.kilometers.estimated_diameter_min + 
                                    asteroidData?.smallestAsteroid?.estimated_diameter.kilometers.estimated_diameter_max) / 2).toFixed(3)} km
                                </p>
                                <p className='sub-title-info'>Diameter</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='card-inner'>
                            <img className='data-img' src={dangerLogo} alt="Danger Sign" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Potentially hazardous</p>
                                <p className='sub-title-data'>{asteroidData?.hazardousCounter}</p>
                                <p className='sub-title-info'>Asteroids</p>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-inner'>
                            <img className='data-img' src={threatLogo} alt="Threat Sign" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Most threatening</p>
                                <p className='sub-title-data'>{asteroidData?.mostThreatening?.name}</p>
                                <p className='sub-title-info'>Threat score</p>
                                <p className='sub-title-data2'>{Math.round(asteroidData?.highestThreatScore)}/100</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className='card-inner'>
                            <img className='data-img' src={speedLogo} alt="Spped Sign" />
                            <div className='card-text'>
                                <p className='sub-title-text'>Fastest asteroid</p>
                                <p className='sub-title-data'>{asteroidData?.fastestAsteroid?.toFixed(2)} km/h</p>
                                <p className='sub-title-info'>Velocity</p>
                            </div>
                        </div>
                    </div>
                </div>    

                <div className='charts-section'>
                    <div className='top-charts'>
                        <div className='chart-box'>
                            <p className='chart-title'>Asteroids per day</p>
                            <AsteoidsPerDayChart data={asteroidData?.asteroidsPerDay || []}/>
                        </div>

                        <div className='chart-box pie-chart'>
                            <p className='chart-title'>Hazardous vs Safe</p>
                            <HazardDistributionChart data={asteroidData?.hazardousAsteroids || []}/>
                        </div>

                        <div className='chart-box wide-chart'>
                            <p className='chart-title'>Velocity Distriubtions (km/h)</p>
                            <VelocityDistributionChart data={asteroidData?.velocityDistribution || []}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Threat_Tracker;