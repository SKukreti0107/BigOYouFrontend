import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import ScoreBar from './ScoreBar.jsx'


const getColumns = (onViewSummary) => [
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
        field: 'Score',
        headerName: 'Score',
        width: 250,
        editable: true,
        renderCell: (params) => {
            const score = params.value;
            if (score === null || score === undefined) {
                return (
                    <div className="flex h-full w-full items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#21262d] text-slate-400 border border-[#30363d]">
                            Pending
                        </span>
                    </div>
                );
            }
            return (
                <div className="flex h-full w-full items-center pr-4">
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                {score}/100
                            </span>
                        </div>
                        <ScoreBar value={score} />
                    </div>
                </div>
            );
        }
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 220,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const isPending = params.row.Score === null || params.row.Score === undefined;
            return (
                <div className="flex h-full w-full items-center">
                    <button
                        onClick={() => onViewSummary?.(params.row)}
                        className={`h-9 px-4 flex items-center gap-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer group active:scale-[0.98] ${
                            isPending
                                ? "border border-slate-700/50 bg-slate-800/20 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 hover:border-slate-600"
                                : "border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 hover:bg-indigo-500/15 hover:text-indigo-200 hover:border-indigo-500/40 shadow-sm shadow-indigo-950/10 hover:shadow-indigo-950/20"
                        }`}
                    >
                        View Summary
                        <span className="material-symbols-outlined text-[14px] transition-transform duration-200 group-hover:translate-x-0.5">
                            arrow_forward
                        </span>
                    </button>
                </div>
            );
        },
    },
];

export default function HistoryTable({
    sessions,
    total = 0,
    loading = false,
    paginationModel,
    onPaginationModelChange,
}) {
    const navigate = useNavigate();

    const handleViewSummary = (row) => {
        if (!row?.id) {
            return;
        }
        navigate(`/history/session/${row.id}`);
    };

    const rows = (Array.isArray(sessions) ? sessions : []).map((session, index) => ({
        ...session,
        id: session.id ?? `${session.Problem ?? "session"}-${index}`,
        Date: session.Date ? new Date(session.Date).toLocaleDateString() : "",
    }));

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
                    columns={getColumns(handleViewSummary)}
                    loading={loading}
                    pagination
                    paginationMode="server"
                    rowCount={total}
                    paginationModel={paginationModel}
                    onPaginationModelChange={onPaginationModelChange}
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
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>

    );
}
