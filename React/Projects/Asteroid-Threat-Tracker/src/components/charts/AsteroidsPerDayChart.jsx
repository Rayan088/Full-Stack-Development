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
                <XAxis dataKey="shortDate" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="count"/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default AsteoidsPerDayChart;