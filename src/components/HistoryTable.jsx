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
            <div style={{ width: '90%', display: 'flex', alignItems: 'center', height: '100%' }}>
                <div style={{ width: '100%' }}>
                    <ScoreBar value={params.value} />
                    <p className='text-xs text-slate-400'>{params.value}/100</p>
                </div>
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
            <button className="px-4 py-1.5 rounded-lg bg-[#137fec] hover:bg-[#137fec]/90 text-white text-xs font-bold transition-all cursor-pointer">
                {'View detailed summary '}
            </button>
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
        <div className='m-4'>
            <Box sx={{
                height: 550,
                width: '100%',
                backgroundColor: "#161b22",
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
                        border: "1px solid #30363d",
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
