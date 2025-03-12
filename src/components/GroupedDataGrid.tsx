import React, { useState } from "react";
import { DataGrid, GridToolbar, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";

interface GroupedDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    groupBy: string; // Field to group by (e.g., "company")
}

const GroupedDataGrid: React.FC<GroupedDataGridProps> = ({ rows, columns, groupBy }) => {
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});

    // Extract unique group names
    const groupedData = rows.reduce<{ [key: string]: any[] }>((acc, row) => {
        const groupValue = row[groupBy] || "Unknown";
        if (!acc[groupValue]) acc[groupValue] = [];
        acc[groupValue].push(row);
        return acc;
    }, {});

    const toggleGroup = (group: string) => {
        setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    };

    const groupedRows = Object.entries(groupedData).flatMap(([group, groupRows], index) => {
        const expanded = expandedGroups[group];
        return [
            { id: `group-${index}`, [groupBy]: group, type: "group" }, // Group Header
            ...(expanded ? groupRows : []), // Child Rows
        ];
    });

    const groupedColumns: GridColDef[] = [
        {
            field: "expand",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) =>
                params.row.type === "group" ? (
                    <IconButton size="small" onClick={() => toggleGroup(params.row[groupBy])}>
                        {expandedGroups[params.row[groupBy]] ? '-' : '+'}
                    </IconButton>
                ) : null,
        },
        ...columns,
    ];

    const gridStyles = {
        border: "1px solid var(--b3)",
        backgroundColor: "var(--b3)",
        "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#3a4a5f",
            color: "oklch(var(--bc))",
            borderBottom: "none",
        },
        "& .MuiDataGrid-filler": {
            backgroundColor: "#3a4a5f",
        },
        "& .MuiDataGrid-cell": {
            color: "oklch(var(--bc))",
            borderColor: "#576f8e",
        },
        "& .MuiDataGrid-footerCell": {
            backgroundColor: "var(--b3)",
        },
        "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-actions, & .MuiTablePagination-select, & .MuiDataGrid-selectedRowCount, & .MuiSelect-icon, & .MuiSvgIcon-root, & .MuiDataGrid-sortIcon, & .MuiDataGrid-iconButtonContainer, & .MuiSvgIcon-fontSizeInherit":
            {
                color: "oklch(var(--bc))",
            },
        "& .group-row .MuiDataGrid-cell": {
            fontWeight: "bold",
            backgroundColor: "#2e3b4e",
            color: "#ffffff",
        },
    };

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                className="pt-3"
                slots={{ toolbar: GridToolbar }}
                rows={groupedRows}
                columns={groupedColumns}
                sx={gridStyles}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                hideFooter
                getRowClassName={(params) => (params.row.type === "group" ? "group-row" : "data-row")}
            />
        </Box>
    );
};

export default GroupedDataGrid;
