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
            flex: 1,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        { field: 'name', headerName: 'Shipment Name', type: 'string', minWidth: 20, flex: 2 },
        // { field: 'from', headerName: 'From', type: 'string', minWidth: 20, flex: 2 },
        {
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridCellParams) => (
                <>
                    <p>{params.row?.fromDetail?.name}</p>
                    <p>{params.row?.fromDetail?.address}</p>
                </>
            )
        },
        {
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridCellParams) => (
                <div>
                    <div>{params.row?.toDetail?.name}</div>
                    <div>{params.row?.toDetail?.address}</div>
                </div>
            )
        },
        // { field: 'to', headerName: 'To', type: 'string', minWidth: 20, flex: 2 },
        { field: 'price', headerName: 'Rate (RM)', type: 'string', minWidth: 20, flex: 2 },

        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: GridCellParams) => (
                <button
                    className='btn btn-sm btn-neutral'
                    onClick={() => router.push(`/company/${params.id}`)}
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
                                router.push(`/company/new`);
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
