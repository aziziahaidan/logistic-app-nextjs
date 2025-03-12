"use client";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import StyledDataGrid from '../../components/StyledDataGrid';
import { useRouter } from 'next/navigation';
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import AnimatedIcon from '@/components/AnimatedIcon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import LocationIcon from "../../icon/Location.json";
import { SingleValue } from 'react-select';
import Pindrop from "../../icon/Pindrop.json";
import StyledSelect from '@/components/StyledSelect';
import { Moment } from "moment";

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
        billedTo?: { label: string; value: string }
        paymentStatus?: { label: string; value: string }

    }

    const router = useRouter();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [companyList, setCompanyList] = useState([])
    const [filter, setFilter] = useState<Filter>({
        billedTo: { label: "All", value: "" },
        paymentStatus: { label: "All", value: "" },

    })
    const [paymentStatusList] = useState([
        { label: "All", value: "" },
        { label: "Paid", value: "true" },
        { label: "Unpaid", value: "false" },
    ])

    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: "No.",
            width: 60,
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
        },
        // { field: 'name', headerName: 'Shipment Name', type: 'string', minWidth: 20, flex: 2 },
        {
            field: 'billedTo',
            headerName: 'Billed To',
            flex: 3,
            renderCell: (params: GridCellParams) => (
                <div className="flex items-center justify-start h-full">
                    <button className="btn btn-sm btn-link" onClick={() => viewCompany(params.row?.billedToDetail?._id)}>
                        {params.row?.billedToDetail?.name}
                    </button>

                </div>
            )
        },
        {
            field: 'from',
            headerName: 'From',
            flex: 3,
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
            flex: 3,
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
        { field: 'capacity', headerName: 'Capacity', type: 'string', minWidth: 20, flex: 3 },
        { field: 'price', headerName: 'Rate (RM)', type: 'string', minWidth: 20, flex: 1 },
    ];

    const viewLocation = (id: string) => {
        router.push(`/location/${id}`)
    }

    const viewCompany = (id: string) => {
        router.push(`/company/${id}`)
    }

    const openMap = (link: string) => {
        window.open(link)

    }

    const getCompany = async () => {
        const company = await fetchCompany();
        setCompanyList(company)

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

    useEffect(()=>{
        console.log("inside filter useeffect")

                // searchTimeout.current = setTimeout(() => {
        //     search(user?.value !== undefined ? user.value : "", uploadDate !== '' ? moment(uploadDate).format("YYYY-MM-DD") : '')
        //   }, 500)
    },[filter])


    
//   React.useEffect(() => {
//     if (!!searchTimeout.current) {
//       clearTimeout(searchTimeout.current)
//       searchTimeout.current = null
//     }

//     const length = keyword?.length || 0

//     if (length >= 3) {
//       searchTimeout.current = setTimeout(() => {
//         search(user?.value !== undefined ? user.value : "", uploadDate !== '' ? moment(uploadDate).format("YYYY-MM-DD") : '')
//       }, 500)
//     } else {
//       setResources([])
//     }
//   }, [keyword])

    const handleDatetime = (value: Moment | null, name: string) => {

        setFilter({
            ...filter,
            [name]: value
        })
    }

    useEffect(() => {
        const fetchData = async () => {

            getCompany()

            try {
                // const res = await fetch("/api/payment?companyId=67c804c6de9e834657114d39&isPaid=false");
                const res = await fetch("/api/payment");

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
                <div className="p-5 rounded-lg bg-primary-content">
                    <div className="grid grid-cols-3 w-full max-w-2xl rounded-lg flex justify-between">
                        <div className='mt-3'>Shipment Date :</div>
                        <div className='col-span-2'>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <div className='flex justify-between'>
                                    <div className='mr-2'>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="From"
                                            // value={formData.pickupDate}
                                            onChange={(value) => { handleDatetime(value, "fromDate") }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    sx: sxStyling
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className=''>
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="To"
                                            // value={formData.pickupDate}
                                            onChange={(value) => { handleDatetime(value, "toDate") }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    sx: sxStyling
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </LocalizationProvider>
                        </div>
                        <div className='mt-3'>Company :</div>
                        <div className='col-span-1 mt-3'>
                            <StyledSelect
                                onChange={handleReactSelect}
                                options={companyList}
                                name="billedTo"
                                val={filter.billedTo || null}
                            />
                        </div>
                        <div className='col-span-1'></div>

                        <div className='mt-3'>Payment Status :</div>
                        <div className='col-span-1 mt-2'>
                            <StyledSelect
                                onChange={handleReactSelect}
                                options={paymentStatusList}
                                name="paymentStatus"
                                val={filter.paymentStatus || null}
                            />
                        </div>
                        <div className='col-span-1'></div>

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
