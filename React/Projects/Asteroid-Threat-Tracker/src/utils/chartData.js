// Calculation of asteoids per day returned in a dictionary
export const getAsteroidsPerDay = (asteroidArray) => {
    const AsteroidsPerDay = {}

    for (const asteroid of asteroidArray) {
        const date = asteroid.close_approach_data[0].close_approach_date_full
        const shortDate = date.split(" ")[0].split("-").slice(1).join("-")

        if (AsteroidsPerDay[shortDate]) {
            AsteroidsPerDay[shortDate]++
        } else {
            AsteroidsPerDay[shortDate] = 1
        }
    }

    return Object.entries(AsteroidsPerDay).map(([shortDate, count]) => ({
            shortDate, count})
    )
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
        const velocity = Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour || 0)

        if (velocity < 20000) {
            velocityBins["0-20k"]++
        } else if (velocity < 40000) {
            velocityBins["20k-40k"]++
        } else if (velocity < 60000) {
            velocityBins["40k-60k"]++ 
        } else if (velocity < 80000) {
            velocityBins["60k-80k"]++ 
        } else {
            velocityBins["80k+"]++
        }
    }

    return Object.entries(velocityBins).map(([range, count]) => ({
        range, count
    }))
}