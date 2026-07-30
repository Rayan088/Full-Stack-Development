import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { getClassInsights } from "../../../api/api";

const CLASS_COLORS = {
    1: "#C89C4E",
    2: "#4D659D",
    3: "#394F86",
};

const CLASS_LABELS = {
    1: "1st",
    2: "2nd",
    3: "3rd",
};

function ClassChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getClassInsights().then(setData);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "14px", fontFamily: '"Cormorant Garamond", serif', textAlign: "center", color: "#A6874E", marginTop: "10px"}}
            >SURVIVAL BY CLASS</h2>
            <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 10, left: -16, bottom: -13 }}>

                        <XAxis
                            dataKey="class"
                            tickFormatter={(value) => CLASS_LABELS[value]}
                            tick={{ fontSize: 13, fill: "#d6dde8"}} axisLine={{ stroke: "#d6dde8" }} tickLine={{ stroke: "#d6dde8" }}/>

                        <YAxis unit="%" domain={[0, 65]} tick={{ fontSize: 13, fill: "#d6dde8"}} axisLine={{ stroke: "#d6dde8" }} tickLine={{ stroke: "#d6dde8" }}/>
                        
                        <Tooltip
                            formatter={(value) => `${value}%`}
                            labelFormatter={(value) => CLASS_LABELS[value]}/>

                        <Bar dataKey="survival_percentage" name="Survival %">
                            {data.map((entry) => (
                                <Cell key={entry.class} fill={CLASS_COLORS[entry.class]} />
                            ))}
                        </Bar>
                        
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ClassChart;