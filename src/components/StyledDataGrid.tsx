import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

interface StyledDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
}

const StyledDataGrid: React.FC<StyledDataGridProps> = ({ rows, columns }) => {

    const gridStyles = {
        border: '1px solid var(--b3)',
        backgroundColor: 'var(--b3)',
        '& .MuiDataGrid-columnHeader': { // --b3
            backgroundColor: '#3a4a5f',
            color: 'oklch(var(--bc))',
            borderBottom: "none"
        },
        '& .MuiDataGrid-filler': {
            backgroundColor: '#3a4a5f',
        },
        '& .MuiDataGrid-cell': { //
            color: 'oklch(var(--bc))',
            borderColor: '#576f8e',
        },
        '& .MuiDataGrid-footerCell': {
            backgroundColor: 'var(--b3)',
        },
        '& .MuiTablePagination-root': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiTablePagination-selectLabel': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiTablePagination-actions': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiTablePagination-select': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiDataGrid-selectedRowCount': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiSelect-icon': {
            color: 'oklch(var(--bc))',
        },
        '& .MuiSvgIcon-root': { // same as button
            color: 'oklch(var(--bc))',
        },
        '& .MuiDataGrid-sortIcon': {
            color: '#fff',
        },
        '& .MuiDataGrid-iconButtonContainer': {
            color: '#fff',
        },
        '& .MuiSvgIcon-fontSizeInherit': {
            color: '#fff'
        },
        

    };


    // const [selectedRows, setSelectedRows] = useState<string[]>([]);
    // const handleRowSelection = (selectionModel: any) => {
    //     setSelectedRows(selectionModel); // selectionModel contains the selected row IDs
    //     console.log("Selected Row IDs:", selectionModel);
    // };

    return (
        <DataGrid
            className='pt-3'
            slots={{ toolbar: GridToolbar }}
            rows={rows}
            columns={columns}
            sx={gridStyles}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
            checkboxSelection
            // onRowSelectionModelChange={handleRowSelection}
            // getRowHeight={() => 'auto'}
            // getRowSpacing={(params) => ({
            //     top: 8,  // Adjust top spacing
            //     bottom: 8, // Adjust bottom spacing
            // })}
        />
    );
};

export default StyledDataGrid;