"use client";
import { PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef, GridCellParams, DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { gridStyles } from '@/components/DataGridStyle';
import AnimatedIcon from '@/components/AnimatedIcon';
import Pindrop from "../../icon/Pindrop.json";


export default function Location() {

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
        { field: 'name', headerName: 'Name', type: 'string', minWidth: 20, flex: 1 },
        { field: 'telNo', headerName: 'Tel No.', type: 'string', minWidth: 20, flex: 1 },
        { field: 'phoneNo', headerName: 'Phone No.', type: 'string', minWidth: 20, flex: 1 },
        // { field: 'address', headerName: 'Address', type: 'string', minWidth: 20, flex: 3 },
        {
            field: 'to',
            headerName: 'Address',
            flex: 3,
            renderCell: (params: GridCellParams) => (
                <div className="flex items-center justify-start h-full">
                    <button className="btn btn-sm btn-link flex items-center" onClick={() => openMap(params.row?.pinpoint)}>
                        <AnimatedIcon
                            width="1.5rem"
                            height="1.5rem"
                            path={Pindrop}
                            loop={false}
                            hover={true}
                        />
                    </button>
                    <p>{params.row?.address}</p>
                </div>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
            renderCell: (params: GridCellParams) => (
                <button
                    className='btn btn-sm btn-neutral'
                    onClick={() => router.push(`/location/${params.id}`)}
                >
                    View
                </button>
            ),
            type: 'actions'
        },
    ];

    const openMap = (link: string) => {
        window.open(link)
    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch("/api/location");

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
                                router.push(`/location/new`);
                            }}
                        >
                            <PlusIcon className="h-4 w-4" />
                            ADD
                        </button>
                    </div>
                    <DataGrid
                        className='pt-3'
                        slots={{ toolbar: GridToolbar }}
                        rows={data}
                        columns={columns}
                        sx={gridStyles}
                        getRowId={(row) => row._id}
                        disableRowSelectionOnClick
                    />
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
