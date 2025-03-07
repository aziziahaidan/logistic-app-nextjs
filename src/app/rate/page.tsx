"use client";
import { PlusIcon } from '@heroicons/react/24/outline';
import StyledDataGrid from '../../components/StyledDataGrid';
import { useRouter } from 'next/navigation';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';

export default function Rate() {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: "No.",
            width: 60,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        { field: 'name', headerName: 'Shipment Name', type: 'string', minWidth: 20, flex: 2 },
        {
            field: 'from',
            headerName: 'From',
            flex: 3,
            renderCell: (params: GridCellParams) => (
                <>
                    <button className='btn btn-sm btn-link'>{params.row?.fromDetail?.name}</button><span>I</span>
                    <p>{`${params.row?.fromDetail?.name} - ${params.row?.fromDetail?.address}`}</p>
                </>
            )
        },
        {
            field: 'to',
            headerName: 'To',
            flex: 3,
            renderCell: (params: GridCellParams) => (
                <p>{`${params.row?.toDetail?.name} - ${params.row?.toDetail?.address}`}</p>
            )
        },
        { field: 'capacity', headerName: 'Capacity', type: 'string', minWidth: 20, flex: 3 },
        { field: 'price', headerName: 'Standard Rate (RM)', type: 'string', minWidth: 20, flex: 1 },

        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params: GridCellParams) => (
                <button
                    className='btn btn-sm btn-neutral'
                    onClick={() => router.push(`/rate/${params.id}`)}
                >
                    View
                </button>
            ),
            type: 'actions'
        },
    ];

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch("/api/rate");

                if (!res.ok) {
                    toast.error('Error, please try again');
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data)
                setData(data)
                setIsLoading(false);

            } catch (error) {
                toast.error('Error, please try again');

            }

        };
        fetchData();
    }, [])

    return (
        <div className="p-4">
            <div className="relative">
                <div className="p-5 rounded-lg bg-base-300">
                    <div className="mb-2">
                        <button
                            className="btn btn-neutral btn-sm"
                            onClick={() => {
                                setIsLoading(true);
                                router.push(`/rate/new`);
                            }}
                        >
                            <PlusIcon className="h-4 w-4" />
                            ADD
                        </button>
                    </div>
                    <StyledDataGrid rows={data} columns={columns} />
                </div>
                <LoadingOverlay isLoading={isLoading} />
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
