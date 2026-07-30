import { useEffect, useState } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,} from "recharts";
import { getAgeInsights } from "../../../api/api";

function AgeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAgeInsights().then(setData);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "14px", fontFamily: '"Cormorant Garamond", serif', textAlign: "center", color: "#A6874E", marginTop: "10px"}}
            >SURVIVAL BY AGE GROUP</h2>
            <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 10, left: -16, bottom: -13 }}>

                        <XAxis dataKey="age_group" tick={{ fontSize: 13, fill: "#d6dde8" }}/>

                        <YAxis unit="%" domain={[0, 65]} tick={{ fontSize: 13, fill: "#d6dde8" }}/>
                        
                        <Tooltip formatter={(value) => `${value}%`} />
                        
                        <Bar
                            dataKey="survival_percentage"
                            fill="#394F86"
                            name="Survival %"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AgeChart;