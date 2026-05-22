import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

export default function PerformanceLineChart({ height = 360, scoreTrend }) {
    const [filter, setFilter] = useState('All');
    
    let easyScores = [];
    let mediumScores = [];
    let hardScores = [];
    let xLabels = [];
    let hasData = false;

    if (scoreTrend && scoreTrend.length >= 2) {
        hasData = true;

        if (filter === 'All') {
            scoreTrend.forEach((item, idx) => {
                const formattedDate = item.date 
                    ? new Date(item.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) 
                    : `Session ${item.session_number}`;
                
                xLabels.push(`#${idx + 1} - ${formattedDate}`);
                
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
            // Filter to only the selected difficulty
            const filtered = scoreTrend.filter(item => item.difficulty === filter);
            filtered.forEach((item, idx) => {
                const formattedDate = item.date 
                    ? new Date(item.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) 
                    : `Session ${item.session_number}`;
                
                xLabels.push(`#${idx + 1} - ${formattedDate}`);
                
                const score = item.score;
                if (filter === 'Easy') {
                    easyScores.push(score);
                } else if (filter === 'Medium') {
                    mediumScores.push(score);
                } else if (filter === 'Hard') {
                    hardScores.push(score);
                }
            });
        }
    }

    // Default global empty state
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

    // Custom empty state if filter yields zero sessions
    if (xLabels.length === 0) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: height,
                    bgcolor: '#181a22',
                    borderRadius: 3,
                    p: 3,
                    border: '1px solid #30363d',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {/* Header with select */}
                <div className="flex justify-between items-center mb-4 px-1">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                        Filter Performance
                    </div>
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-[#0d1117] text-slate-300 text-xs font-semibold rounded-lg border border-[#30363d] px-3 py-1.5 pr-8 hover:border-[#137fec] transition-colors duration-200 outline-none appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundPosition: 'right 8px center',
                                backgroundSize: '16px',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>
                
                {/* Visual Empty State */}
                <div className="flex-grow flex flex-col items-center justify-center gap-2 text-center p-4">
                    <span className="material-symbols-outlined text-slate-700 text-4xl mb-1">show_chart</span>
                    <p className="text-slate-400 text-sm font-semibold">No data for {filter} difficulty</p>
                    <p className="text-slate-600 text-xs max-w-[280px] leading-relaxed">
                        You have not completed any mock interviews under this difficulty level yet. Complete a session to start tracking your {filter} score trend!
                    </p>
                </div>
            </Box>
        );
    }

    // Build chart series dynamically based on selected filter
    const series = [];
    if (filter === 'All' || filter === 'Easy') {
        series.push({
            data: easyScores,
            label: 'Easy',
            color: '#10b981',
            curve: 'catmullRom',
            showMark: true,
            connectNulls: true,
        });
    }
    if (filter === 'All' || filter === 'Medium') {
        series.push({
            data: mediumScores,
            label: 'Medium',
            color: '#137fec',
            curve: 'catmullRom',
            showMark: true,
            connectNulls: true,
        });
    }
    if (filter === 'All' || filter === 'Hard') {
        series.push({
            data: hardScores,
            label: 'Hard',
            color: '#f43f5e',
            curve: 'catmullRom',
            showMark: true,
            connectNulls: true,
        });
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
                display: 'flex',
                flexDirection: 'column',

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
            }}
        >
            {/* Custom Premium Header Selector & Legend Row */}
            <div className="flex justify-between items-center mb-4 px-2 select-none z-10">
                {/* Glowing Legend Indicators */}
                <div className="flex items-center gap-4 text-[11px] font-bold">
                    {(filter === 'All' || filter === 'Easy') && (
                        <div className="flex items-center gap-1.5 transition-all duration-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                            <span className="text-slate-400">Easy</span>
                        </div>
                    )}
                    {(filter === 'All' || filter === 'Medium') && (
                        <div className="flex items-center gap-1.5 transition-all duration-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#137fec] shadow-[0_0_8px_#137fec]" />
                            <span className="text-slate-400">Medium</span>
                        </div>
                    )}
                    {(filter === 'All' || filter === 'Hard') && (
                        <div className="flex items-center gap-1.5 transition-all duration-300">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
                            <span className="text-slate-400">Hard</span>
                        </div>
                    )}
                </div>

                {/* Customized Filter Dropdown */}
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-[#0d1117] text-slate-300 text-xs font-semibold rounded-lg border border-[#30363d] px-3 py-1.5 pr-8 hover:border-[#137fec] hover:text-white transition-all duration-200 outline-none appearance-none cursor-pointer shadow-md"
                        style={{
                            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 8px center',
                            backgroundSize: '16px',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            {/* Line Chart */}
            <div className="flex-grow w-full h-[calc(100%-40px)]">
                <LineChart
                    series={series}
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
                            hidden: true, // Hide MUI default legend
                        },
                    }}
                />
            </div>
        </Box>
    );
}
