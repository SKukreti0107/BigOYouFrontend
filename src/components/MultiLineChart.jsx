import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

// Interview performance scores (0-100)
const easyScores = [72, 78, 85, 82, 88, 91, 95];
const mediumScores = [58, 62, 55, 68, 72, 75, 82];
const hardScores = [35, 42, 38, 48, 55, 52, 65];
const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];

export default function PerformanceLineChart() {
    return (
        <Box
            sx={{
                width: '100%',
                height: 320,
                bgcolor: '#181a22',
                borderRadius: 3,
                p: 2,
                border: '1px solid #30363d',

                /* Axis lines */
                '& .MuiChartsAxis-line': {
                    stroke: '#4c5661',
                },

                /* Tick labels */
                '& .MuiChartsAxis-tickLabel': {
                    fill: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 500,
                },

                /* Grid lines */
                '& .MuiChartsGrid-line': {
                    stroke: '#4c5661',
                    strokeDasharray: '4 4',
                },

                /* Legend */
                '& .MuiChartsLegend-root': {
                    color:"white",
                    fontSize: 12,
                    fontWeight: 600,
                },
            }}
        >
            <LineChart
                series={[
                    {
                        data: easyScores,
                        label: 'Easy',
                        color: '#10b981',
                        curve: 'catmullRom',
                        showMark: true,
                    },
                    {
                        data: mediumScores,
                        label: 'Medium',
                        color: '#137fec',
                        curve: 'catmullRom',
                        showMark: true,
                    },
                    {
                        data: hardScores,
                        label: 'Hard',
                        color: '#f43f5e',
                        curve: 'catmullRom',
                        showMark: true,
                    },
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: xLabels,
                        tickLabelStyle: {
                            fill: '#94a3b8',
                            fontSize: 11,
                        },
                    },
                ]}
                yAxis={[
                    {
                        min: 0,
                        max: 100,
                        tickLabelStyle: {
                            fill: '#94a3b8',
                            fontSize: 11,
                        },
                    },
                ]}
                grid={{ horizontal: true }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'right' },
                        padding: { top: 0, bottom: 16 },
                    },
                }}
            />
        </Box>
    );
}
