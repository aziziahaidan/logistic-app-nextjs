export const gridStyles = {
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
    '& .MuiCheckbox-root.Mui-disabled': {
        color: '#9e9e9e !important', 
        opacity: 0.6, 
    },
};