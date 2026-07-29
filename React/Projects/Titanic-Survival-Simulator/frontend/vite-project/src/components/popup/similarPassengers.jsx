function SimilarPassengers({ passengers }) {
    console.log(passengers)

    return (
        <div className="popup-card similar-passengers">
            <div className="section-header">
                <h2>SIMILAR PASSENGERS IN HISTORY</h2>
            </div>

            <table className="passenger-table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>GENDER</th>
                        <th>CLASS</th>
                        <th>PORT</th>
                        <th>FAMILY SIZE</th>
                        <th>SURVIVED</th>
                    </tr>
                </thead>

                <tbody>
                    {passengers.map((passenger, index) => (
                        <tr key={index}>
                            <td>{passenger.name}</td>
                            <td>{passenger.age}</td>
                            <td>{passenger.gender}</td>
                            <td>{passenger.passenger_class}</td>
                            <td>{passenger.embarked}</td>
                            <td>{passenger.family_size}</td>
                            <td className="survived">{passenger.survived ? "Survived" : "Perished"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SimilarPassengers;