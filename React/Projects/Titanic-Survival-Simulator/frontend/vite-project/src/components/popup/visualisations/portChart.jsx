import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getPortInsights } from "../../../api/api";

const PORT_COLORS = {
    Southampton: "#C89C4E",
    Cherbourg: "#394F86",
    Queenstown: "#4D659D",
};

function PortChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getPortInsights().then(setData);
    }, []);

    return (
        <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "14px", fontFamily: '"Cormorant Garamond", serif', textAlign: "center", color: "#A6874E", marginTop: "10px"}}
            >SURVIVAL BY PORT</h2>
            <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 10, left: 60, bottom: 10 }}>
                        <Pie
                            data={data}
                            dataKey="survival_percentage"
                            nameKey="port"
                            cx="35%"     
                            cy="50%"
                            innerRadius="50%"
                            outerRadius="85%"
                            stroke="none"
                        >
                            {data.map((entry) => (
                                <Cell key={entry.port} fill={PORT_COLORS[entry.port]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="align"
                            height={44}
                            wrapperStyle={{ fontSize: 13, color: "#d6dde8", top: "165px"}}
                            formatter={(value) => {
                                const item = data.find(d => d.port === value);
                                return `${value}: ${item?.survival_percentage.toFixed(0)}%`;
                            }}
                        />
                        <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PortChart;