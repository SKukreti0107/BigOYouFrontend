import MultiLineChart from './MultiLineChart'

export default function PerformanceAnalytics({ scoreTrend }) {
    return (
        <MultiLineChart height={360} scoreTrend={scoreTrend}></MultiLineChart>
    )
}