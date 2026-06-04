// Helper function to calculate diameter
export const getDiameter = (asteroid) => {
    return (
        asteroid.estimated_diameter.kilometers.estimated_diameter_min +
        asteroid.estimated_diameter.kilometers.estimated_diameter_max
    ) / 2;
};

// Closest asteroid calculation
export const getClosestAsteroid = (asteroidArray) => {
    let closestAsteroid = asteroidArray[0];

    for (const asteroid of asteroidArray) {
        const distance = Number(
            asteroid.close_approach_data[0].miss_distance.lunar
        );

        const closestDistance = Number(
            closestAsteroid.close_approach_data[0].miss_distance.lunar
        );

        if (distance < closestDistance) {
            closestAsteroid = asteroid;
        }
    }

    return closestAsteroid;
};

// Smallest asteroid calculation
export const getSmallestAsteroid = (asteroidArray) => {
    let smallestAsteroid = asteroidArray[0];

    for (const asteroid of asteroidArray) {
        if (getDiameter(asteroid) < getDiameter(smallestAsteroid)) {
            smallestAsteroid = asteroid;
        }
    }

    return smallestAsteroid;
};

// Largest asteroid calculation
export const getLargestAsteroid = (asteroidArray) => {
    let largestAsteroid = asteroidArray[0];

    for (const asteroid of asteroidArray) {
        if (getDiameter(asteroid) > getDiameter(largestAsteroid)) {
            largestAsteroid = asteroid;
        }
    }

    return largestAsteroid;
};

// Number of hazardous asteroids
export const getHazardousCount = (asteroidArray) => {
    let hazardousCounter = 0;

    for (const asteroid of asteroidArray) {
        if (asteroid.is_potentially_hazardous_asteroid) {
            hazardousCounter++;
        }
    }

    return hazardousCounter;
};

// Fastest asteroid calculation
export const getFastestAsteroid = (asteroidArray) => {
    let fastestAsteroid = 0

    for (const asteroid of asteroidArray) {
        const velocity = Number(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour || 0)
        
        if (velocity > fastestAsteroid) {
            fastestAsteroid = velocity
        }
    }

    return fastestAsteroid;
}

// Most threatening asteroids calculation
export const getMostThreateningAsteroid = (asteroidArray) => {
    let mostThreatening = asteroidArray[0];
    let highestThreatScore = 0;

    for (const asteroid of asteroidArray) {
        const diameter = getDiameter(asteroid);

        const velocity = Number(
            asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
        );

        const distance = Number(
            asteroid.close_approach_data[0].miss_distance.lunar
        );

        const threatScore =
            ((diameter * velocity) / distance) / 10;

        if (threatScore > highestThreatScore) {
            highestThreatScore = threatScore;
            mostThreatening = asteroid;
        }
    }

    return {
        asteroid: mostThreatening,
        score: Math.round(highestThreatScore)
    };
};