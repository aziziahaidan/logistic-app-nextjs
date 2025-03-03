"use client";
import { PlusIcon } from '@heroicons/react/24/outline';
import StyledDataGrid from '../../components/StyledDataGrid';
import { useRouter } from 'next/navigation';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getAllUsers, getAllRoles } from '@/actions/auth';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useAlert } from '@/hook/useAlert';
// import Alert from '../../components/Alert';

export default function Staff() {

    const router = useRouter();
    const { showAlert, setShow } = useAlert();

    const [data, setData] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: "No.",
            flex: 1,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        { field: 'name', headerName: 'Name', type: 'string', minWidth: 20, flex: 2 },
        { field: 'email', headerName: 'Email', type: 'string', minWidth: 20, flex: 2 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <button
                    className='btn btn-sm btn-neutral'
                    onClick={() => router.push(`/staff/${params.id}`)}
                >
                    View
                </button>
            ),
            type: 'actions'
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const users = await getAllUsers();
            setData(users);
            const roles = await getAllRoles();
            setRoleList(roles);
            setIsLoading(false);
        };
        fetchData();
    }, [])

    return (
        <div className="p-4">
            <button
                className="btn btn-neutral btn-sm"
                onClick={() => {
                    showAlert("This is a success message!", "success");
                }}
            >Test</button>
            <div className="relative">
                <div className="p-5 rounded-lg bg-base-300">
                    <div className="mb-2">
                        <button
                            className="btn btn-neutral btn-sm"
                            onClick={() => {
                                setIsLoading(true);
                                router.push(`/staff/new`);
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
        </div>
    );
}
