// Calculation of asteoids per day returned in a dictionary
export const getAsteroidsPerDay = (asteroidArray) => {
    const AsteroidsPerDay = {}

    for (const asteroid of asteroidArray) {
        const date = asteroid.close_approach_data[0].close_approach_date_full

        if (AsteroidsPerDay[date]) {
            AsteroidsPerDay[date]++
        } else {
            AsteroidsPerDay[date] = 1
        }
    }

    return AsteroidsPerDay
}

// Calculation of hazardous vs safe asteroids
export const getHazardousAsteroids = (asteroidArray) => {
    let hazardous = 0
    let safe = 0

    for (const asteroid of asteroidArray) {
        if (asteroid.is_potentially_hazardous_asteroid) {
            hazardous++
        } else {
            safe++
        }
    }

    return [
        {
            name: "Hazardous",
            value: hazardous
        },
        {
            name: "Safe",
            value: safe
        }
    ];
}

// Calculation of velocity distribution
export const getVelocityDistribution = (asteroidArray) => {
    const velocityBins = {
        "0-20k": 0,
        "20k-40k": 0,
        "40k-60k": 0,
        "60k-80k": 0,
        "80k+": 0
    }

    for (const asteroid of asteroidArray) {
        const velocity = Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)

        if (velocity < 20000) {
            velocityBins["0-20k"]++
        } else if (velocity < 40000) {
            velocityBins["20-40k"]++
        } else if (velocity < 60000) {
            velocityBins["40-60k"]++ 
        } else if (velocity < 80000) {
            velocityBins["60-80k"]++ 
        } else {
            velocity["80k+"]++
        }
    }

    return Object.entries(velocityBins).map(([range, count]) => ({
        range, count
    }))
}