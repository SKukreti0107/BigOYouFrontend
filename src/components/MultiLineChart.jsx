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
    let hasData = false;

    if (scoreTrend && scoreTrend.length >= 2) {
        hasData = true;
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
    }

    if (!hasData) {
        return (
            <div
                style={{ height }}
                className="w-full rounded-xl border border-[#30363d] bg-[#0d1117]/30 flex flex-col items-center justify-center gap-4"
            >
                <svg className="w-full h-[55%] px-8 opacity-[0.07]" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d="M 0 170 Q 60 130 120 140 T 240 90 T 360 110 T 400 50" fill="none" stroke="#137fec" strokeWidth="3" />
                    <path d="M 0 180 Q 80 160 160 155 T 320 130 T 400 100" fill="none" stroke="#10b981" strokeWidth="3" />
                    <line x1="0" y1="195" x2="400" y2="195" stroke="#30363d" strokeWidth="2" />
                </svg>
                <div className="flex flex-col items-center gap-2 pb-6 -mt-4">
                    <span className="material-symbols-outlined text-slate-700 text-4xl">show_chart</span>
                    <p className="text-slate-500 text-sm font-semibold">No score trend yet</p>
                    <p className="text-slate-700 text-xs text-center max-w-[240px] leading-relaxed">
                        Complete at least 2 mock interviews to unlock your performance trend graph.
                    </p>
                </div>
            </div>
        );
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
