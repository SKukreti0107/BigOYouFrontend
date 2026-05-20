import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

// Interview performance scores (0-100)
const easyScores = [72, 78, 85, 82, 88, 91, 95];
const mediumScores = [58, 62, 55, 68, 72, 75, 82];
const hardScores = [35, 42, 38, 48, 55, 52, 65];
const xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];

export default function PerformanceLineChart({ height = 360, scoreTrend }) {
    let easyScores = [];
    let mediumScores = [];
    let hardScores = [];
    let xLabels = [];
    let isMock = false;

    if (scoreTrend && scoreTrend.length >= 2) {
        scoreTrend.forEach((item, idx) => {
            const formattedDate = item.date ? new Date(item.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : `Session ${item.session_number}`;
            xLabels.push(formattedDate);
            
            const score = item.score;
            if (item.difficulty === 'Easy') {
                easyScores.push(score);
                mediumScores.push(null);
                hardScores.push(null);
            } else if (item.difficulty === 'Medium') {
                easyScores.push(null);
                mediumScores.push(score);
                hardScores.push(null);
            } else if (item.difficulty === 'Hard') {
                easyScores.push(null);
                mediumScores.push(null);
                hardScores.push(score);
            } else {
                easyScores.push(null);
                mediumScores.push(null);
                hardScores.push(null);
            }
        });
    } else {
        // Default benchmark metrics
        easyScores = [72, 78, 85, 82, 88, 91, 95];
        mediumScores = [58, 62, 55, 68, 72, 75, 82];
        hardScores = [35, 42, 38, 48, 55, 52, 65];
        xLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];
        isMock = true;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: height,
                bgcolor: '#181a22',
                borderRadius: 3,
                p: 2,
                border: '1px solid #30363d',
                position: 'relative',

                /* Axis lines */
                '& .MuiChartsAxis-line': {
                    stroke: '#4c5661',
                },

                /* Tick labels */
                '& .MuiChartsAxis-tickLabel': {
                    fill: '#94a3b8',
                    fontSize: 10,
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
                    fontSize: 10,
                    fontWeight: 600,
                },
            }}
        >
            {isMock && (
                <div className="absolute top-4 left-4 z-20 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-[9px] font-black text-amber-500 uppercase tracking-widest animate-pulse pointer-events-none">
                    Benchmark Insights
                </div>
            )}
            <LineChart
                series={[
                    {
                        data: easyScores,
                        label: 'Easy',
                        color: '#10b981',
                        curve: 'catmullRom',
                        showMark: true,
                        connectNulls: true,
                    },
                    {
                        data: mediumScores,
                        label: 'Medium',
                        color: '#137fec',
                        curve: 'catmullRom',
                        showMark: true,
                        connectNulls: true,
                    },
                    {
                        data: hardScores,
                        label: 'Hard',
                        color: '#f43f5e',
                        curve: 'catmullRom',
                        showMark: true,
                        connectNulls: true,
                    },
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: xLabels,
                        tickLabelStyle: {
                            fill: '#94a3b8',
                            fontSize: 10,
                        },
                    },
                ]}
                yAxis={[
                    {
                        min: 0,
                        max: 100,
                        tickLabelStyle: {
                            fill: '#94a3b8',
                            fontSize: 10,
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
