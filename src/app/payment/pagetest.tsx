"use client"
import GroupedDataGrid from "@/components/GroupedDataGrid";
import StyledDataGrid from "@/components/StyledDataGrid";
import React, { useEffect, useState } from "react";
import LoadingOverlay from '../../components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';

export default function Payment() {


    const rows = [
        { id: 1, company: "Company A", order: "Order #123", date: "2024-03-10", status: "Shipped" },
        { id: 2, company: "Company A", order: "Order #124", date: "2024-03-11", status: "Pending" },
        { id: 3, company: "Company B", order: "Order #456", date: "2024-03-12", status: "Delivered" },
    ];

    const columns = [
        { field: "order", headerName: "Order", width: 200 },
        { field: "date", headerName: "Date", width: 120 },
        { field: "status", headerName: "Status", width: 150 },
    ];


   


    return (
        <div className="p-4">
            <div className="relative">
                <div className="p-5 rounded-lg bg-base-300">
                    <GroupedDataGrid rows={rows} columns={columns} groupBy="company" />

                </div>
                <LoadingOverlay isLoading={false} />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
