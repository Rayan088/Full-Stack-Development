import {PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer} from 'recharts';

const HazardDistributionChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    stroke="#1b1f5a"
                >
                    <Cell fill="#2C1A70" />
                    <Cell fill="#500aef" />
                </Pie>

                <Tooltip />

                <Legend
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => (
                        <span style={{ color: '#fff' }}>
                            {value}
                        </span>)}

                    payload={[
                        { value: 'Safe', type: 'square', color: '#2C1A70' },
                        { value: 'Hazardous', type: 'square', color: '#500aef' }
                    ]}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default HazardDistributionChart;