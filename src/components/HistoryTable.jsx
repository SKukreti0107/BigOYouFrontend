import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ScoreBar from './ScoreBar.jsx'

const columns = [
    {
        field: 'Problem',
        headerName: 'Problem',
        width: 300,
        editable: true,
    },
    {
        field: 'Topic',
        headerName: 'Topic',
        width: 300,
        editable: true,
    },
    {
        field: 'Difficulty',
        headerName: 'Difficulty',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'Score',
        headerName: 'Score',
        width: 200,
        renderCell: (params) => (
            <div className="w-[90%] flex flex-col justify-center h-full gap-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{params.value}/100</span>
                </div>
                <ScoreBar value={params.value} />
            </div>
        ),
    },
    {
        field: 'Date',
        headerName: 'Date',
        type: 'string',
        width: 150,
        editable: true,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 300,
        renderCell: () => (
            <div className="flex h-full w-full items-center">
                <button className="flex items-center gap-1.5 px-3 rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:border-slate-500 text-slate-300 hover:text-white text-[11px] font-semibold tracking-wide uppercase transition-all cursor-pointer group">
                    View Summary
                    <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-white transition-colors">arrow_forward</span>
                </button>
            </div>
        ),
    },
];

const rows = [
    { id: 1, Problem: 'Snow', Topic: 'Jon', Difficulty: 14, Score: 10, Date: '2022-01-01', Action: 'View' },
    { id: 2, Problem: 'Lannister', Topic: 'Cersei', Difficulty: 31, Score: 96, Date: '2022-01-01', Action: 'View' },
    { id: 3, Problem: 'Lannister', Topic: 'Jaime', Difficulty: 31, Score: 13, Date: '2022-01-01', Action: 'View' },
    { id: 4, Problem: 'Stark', Topic: 'Arya', Difficulty: 11, Score: 45, Date: '2022-01-01', Action: 'View' },
    { id: 5, Problem: 'Targaryen', Topic: 'Daenerys', Difficulty: null, Score: 66, Date: '2022-01-01', Action: 'View' },
    { id: 6, Problem: 'Melisandre', Topic: null, Difficulty: 150, Score: 100, Date: '2022-01-01', Action: 'View' },
    { id: 7, Problem: 'Clifford', Topic: 'Ferrara', Difficulty: 44, Score: 100, Date: '2022-01-01', Action: 'View' },
    { id: 8, Problem: 'Frances', Topic: 'Rossini', Difficulty: 36, Score: 100, Date: '2022-01-01', Action: 'View' },
    { id: 9, Problem: 'Roxie', Topic: 'Harvey', Difficulty: 65, Score: 100, Date: '2022-01-01', Action: 'View' },
];

export default function HistoryTable() {
    return (
        <div className='w-full'>
            <Box sx={{
                height: 550,
                width: '100%',
                backgroundColor: "#161b22",
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '1px solid #30363d'
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={70}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                        backgroundColor: "#161b22",
                        color: "#c9d1d9",
                        border: "none",
                        outline: 'none',
                        '--DataGrid-rowBorderColor': 'transparent',
                        '& .MuiDataGrid-main': {
                            backgroundColor: "#161b22",
                        },
                        '& .MuiDataGrid-row': {
                            borderBottom: '1px solid #30363d',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: "none",
                            borderTop: "none",
                            padding: '0 16px',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: "#161b22 !important",
                            borderBottom: "1px solid #30363d",
                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: "#161b22 !important",
                            color: "#f0f6fc",
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                            color: "#f0f6fc",
                        },
                        '& .MuiDataGrid-filler': {
                            backgroundColor: "#161b22 !important",
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: "1px solid #30363d",
                            backgroundColor: "#161b22",
                        },
                        '& .MuiTablePagination-root': {
                            color: "#c9d1d9",
                        },
                        '& .MuiTablePagination-actions .MuiButtonBase-root': {
                            color: "#c9d1d9",
                        },
                        '& .MuiTablePagination-actions .MuiButtonBase-root.Mui-disabled': {
                            color: "#484f58",
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: "#1f242c",
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>

    );
}
