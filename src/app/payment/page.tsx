"use client";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GridColDef, GridCellParams, DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { gridStyles } from '@/components/DataGridStyle';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import AnimatedIcon from '@/components/AnimatedIcon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import LocationIcon from "../../icon/Location.json";
import { SingleValue } from 'react-select';
import Pindrop from "../../icon/Pindrop.json";
import StyledSelect from '@/components/StyledSelect';
import moment, { Moment } from "moment";
import { Box, Typography } from '@mui/material';
export default function Payment() {

    const sxStyling = {
        '& .MuiInputLabel-root': {
            color: '#e6e6e6',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#e6e6e6',
        }
    }


    interface Option {
        value: string;
        label: string;
    }

    interface Filter {
        dateFrom?: Date | null;
        dateTo?: Date | null;
        companyId?: { label: string; value: string } | null;
        paymentStatus?: { label: string; value: string } | null;
    }


    const router = useRouter();

    interface PaymentData {
        _id: string;
        isPaid: boolean;
        price: number;
        billedToDetail?: { name: string };
        fromDetail?: { _id: string; name: string; pinpoint: string };
        toDetail?: { _id: string; name: string; pinpoint: string };
        pickupDate?: string;
        capacity?: string;
    }

    const [data, setData] = useState<PaymentData[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [companyList, setCompanyList] = useState([])
    const [filter, setFilter] = useState<Filter>({
        companyId: { label: "All", value: "" },
        paymentStatus: { label: "All", value: "" },
        dateFrom: null,
        dateTo: null,
    });

    const [paymentStatusList] = useState([
        { label: "All", value: "" },
        { label: "Paid", value: "true" },
        { label: "Not Paid", value: "false" },
    ])

    const totalPaidPrice = data.filter((row) => row.isPaid).reduce((sum, row) => sum + row.price, 0);

    const totalToBePaid = data.filter((row) => selectedRows.includes(row._id) && !row.isPaid).reduce((sum, row) => sum + row.price, 0);

    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: "No.",
            width: 60,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        {
            field: 'billedTo',
            headerName: 'Billed To',
            flex: 1,
            renderCell: (params: GridCellParams) => (
                <p>{params.row?.billedToDetail?.name}</p>
            )
        },
        {
            field: 'from',
            headerName: 'From',
            flex: 2,
            renderCell: (params: GridCellParams) => (
                <div className="flex items-center justify-start h-full">
                    <button className="btn btn-sm btn-link" onClick={() => viewLocation(params.row?.fromDetail?._id)}>
                        {params.row?.fromDetail?.name}
                    </button>
                    <button className="btn btn-sm btn-link flex items-center" onClick={() => openMap(params.row?.fromDetail?.pinpoint)}>
                        <AnimatedIcon
                            width="1.5rem"
                            height="1.5rem"
                            path={Pindrop}
                            loop={false}
                            hover={true}
                        />
                    </button>
                </div>

            )
        },
        {
            field: 'to',
            headerName: 'To',
            flex: 2,
            renderCell: (params: GridCellParams) => (
                <div className="flex items-center justify-start h-full">
                    <button className="btn btn-sm btn-link" onClick={() => viewLocation(params.row?.toDetail?._id)}>
                        {params.row?.toDetail?.name}
                    </button>
                    <button className="btn btn-sm btn-link flex items-center" onClick={() => openMap(params.row?.toDetail?.pinpoint)}>
                        <AnimatedIcon
                            width="1.5rem"
                            height="1.5rem"
                            path={Pindrop}
                            loop={false}
                            hover={true}
                        />
                    </button>
                </div>
            )
        },
        { field: 'capacity', headerName: 'Capacity', type: 'string', minWidth: 20, flex: 2 },
        {
            field: 'pickupDate',
            headerName: 'Date',
            flex: 1,
            renderCell: (params: GridCellParams) => (
                <p>
                    {params.row?.pickupDate ? moment(new Date(params.row?.pickupDate)).format('DD-MM-YYYY') : ""}
                </p>
                // <div className="flex items-center justify-start h-full">
                //     <span className={`badge p-3 m-3 ${params.row?.isPaid ? "badge-info" : "badge-error"}`}>
                //         {params.row?.isPaid ? "Paid" : "Not Paid"}
                //     </span>


                // </div>
            )
        },
        { field: 'price', headerName: 'Rate (RM)', type: 'string', minWidth: 20, flex: 1 },
        {
            field: 'isPaid',
            headerName: 'Payment Status',
            flex: 1,
            renderCell: (params: GridCellParams) => (
                <div className="flex items-center justify-start h-full">
                    <span className={`badge p-3 m-3 ${params.row?.isPaid ? "badge-info" : "badge-error"}`}>
                        {params.row?.isPaid ? "Paid" : "Not Paid"}
                    </span>


                </div>
            )
        },
    ];


    const viewLocation = (id: string) => {
        router.push(`/location/${id}`)
    }

    const openMap = (link: string) => {
        window.open(link)

    }

    const getCompany = async () => {
        const company = await fetchCompany();
        let tempArr: any = [{ label: "All", value: "" }, ...company]
        setCompanyList(tempArr)

    }

    const fetchCompany = async () => {

        try {
            const companyReq = await fetch('/api/company');
            if (!companyReq.ok) {
                toast.error("Something went wrong, Please try again.");
            }
            let company = await companyReq.json();

            company = company.map((obj: any) => ({
                label: obj.name,
                value: obj._id
            }))

            return company
        }
        catch (e) {
            toast.error('Error fetching company')
        }

    }

    const handleReactSelect = (option: SingleValue<Option>, name: string) => {

        setFilter({ ...filter, [name]: option })


    }

    const search = async () => {


        setIsLoading(true);
        const params = new URLSearchParams();

        if (filter.companyId?.value) {
            params.append("companyId", filter.companyId.value);
        }

        if (filter.paymentStatus?.value) {
            params.append("isPaid", filter.paymentStatus.value);
        }

        if (filter.dateFrom) {
            params.append("dateFrom", moment(filter.dateFrom).format('YYYY-MM-DD'));
        }

        if (filter.dateTo) {
            params.append("dateTo", moment(filter.dateTo).format('YYYY-MM-DD'));
        }

        let url = "/api/payment" + (params.toString() ? `?${params.toString()}` : "");

        const res = await fetch(url);

        if (!res.ok) {
            toast.error('Error, please try again');
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setData(data)
        setIsLoading(false);

    }

    useEffect(() => { search() }, [filter]);

    const handleDatetime = (value: Moment | null, name: string) => {

        setFilter({
            ...filter,
            [name]: value
        })
    }

    const updatePayment = async () => {

        try {
            const res = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: selectedRows }),
            });

            if (res.ok) {
                toast.success("Payment Status Updated Successfully!");
                setSelectedRows([])
                setTimeout(() => {
                    search()
                }, 300)

            } else {
                toast.error("Something went wrong, Please try again.");
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }

            return await res.json();
        } catch (error) {
            toast.error("Something went wrong, Please try again.");
            return null;
        }
    }

    const handleRowSelection = (selectionModel: any) => {
        setSelectedRows(selectionModel);
    };

    useEffect(() => {
        const fetchData = async () => {

            getCompany()

            try {
                // const res = await fetch("/api/payment?companyId=67c804c6de9e834657114d39&isPaid=true");
                // const res = await fetch("/api/payment?isPaid=false");
                const res = await fetch("/api/payment");

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
                <div className="p-5 rounded-lg bg-primary-content ">
                    <div className="flex flex-col w-full max-w-2xl p-4 rounded-lg">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="w-1/3">Shipment Date:</span>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <div className="flex gap-2 w-2/3">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        label="From"
                                        onChange={(value) => handleDatetime(value, "dateFrom")}
                                        slotProps={{ textField: { size: "small", sx: sxStyling } }}
                                    />
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        label="To"
                                        onChange={(value) => handleDatetime(value, "dateTo")}
                                        slotProps={{ textField: { size: "small", sx: sxStyling } }}
                                    />
                                </div>
                            </LocalizationProvider>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                            <span className="w-1/3">Company:</span>
                            <div className="w-2/3">
                                <StyledSelect
                                    onChange={handleReactSelect}
                                    options={companyList}
                                    name="companyId"
                                    val={filter.companyId || null}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-1/3">Payment Status:</span>
                            <div className="w-2/3">
                                <StyledSelect
                                    onChange={handleReactSelect}
                                    options={paymentStatusList}
                                    name="paymentStatus"
                                    val={filter.paymentStatus || null}
                                />
                            </div>
                        </div>
                    </div>
                    <DataGrid
                        className='pt-3'
                        slots={{
                            toolbar: GridToolbar, // Toolbar (search, export, etc.)
                            footer: () => <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    padding: 2,
                                    backgroundColor: '#3a4a5f',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}>
                                {selectedRows.length === 0 ? <Typography>Total Payment Received: RM{parseFloat(totalPaidPrice.toString()).toFixed(2)}</Typography>
                                    :
                                    <Typography>Total to be Paid: RM{parseFloat(totalToBePaid.toString()).toFixed(2)}</Typography>
                                }
                            </Box>
                        }}
                        rows={data}
                        columns={columns}
                        sx={gridStyles}
                        getRowId={(row) => row._id}
                        disableRowSelectionOnClick
                        checkboxSelection
                        isRowSelectable={(params) => !params.row.isPaid}
                        rowSelectionModel={selectedRows} 
                        onRowSelectionModelChange={handleRowSelection}
                    />
                    {selectedRows.length > 0 && <div className='py-5'>
                        <button className='btn btn-sm btn-outline btn-info float-right mb-4'
                            onClick={updatePayment}
                        >Update Payment Status</button>
                    </div>}
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
