import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getGenderInsights } from "../../../api/api";

const GENDER_COLORS = {
    Female: "#C89C4E",
    Male: "#394F86",
};

function GenderChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getGenderInsights().then(setData);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "14px", fontFamily: '"Cormorant Garamond", serif', textAlign: "center", color: "#A6874E", marginTop: "10px"}}
            >SURVIVAL BY GENDER</h2>
            <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 10, left: 60, bottom: 10 }}>
                        <Pie
                            data={data}
                            dataKey="survival_percentage"
                            nameKey="gender"
                            cx="35%"     
                            cy="50%"
                            innerRadius="50%"
                            outerRadius="85%"
                            stroke="none"
                        >
                            {data.map((entry) => (
                                <Cell key={entry.gender} fill={GENDER_COLORS[entry.gender]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="align"
                            height={44}
                            wrapperStyle={{ fontSize: 13, color: "#d6dde8", top: "170px", marginLeft: "12px"}}
                            formatter={(value) => {
                                const item = data.find(d => String(d.gender) === String(value));
                                return `${value}: ${item?.survival_percentage.toFixed(0)}%`;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GenderChart;