import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

const AsteoidsPerDayChart = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={(data)}>

                <defs>
                    <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#2C1A70" />
                        <stop offset="100%" stopColor="#500aef" />
                    </linearGradient>
                </defs>

                <XAxis dataKey="shortDate" stroke='#fff'/>
                <YAxis stroke='#fff'/>
                <Tooltip />

                <Bar
                    dataKey="count"
                    fill="url(#barGradient)"/>
                    
            </BarChart>
        </ResponsiveContainer>
    )
}

export default AsteoidsPerDayChart;