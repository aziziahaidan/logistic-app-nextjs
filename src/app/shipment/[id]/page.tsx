
'use client';
import { useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { SingleValue } from 'react-select';
import StyledSelect from '@/components/StyledSelect';
import BackButton from '@/components/BackButton';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment, { Moment } from "moment";

interface Location {
    label: string;
    value: string;
}

interface FormData {
    name?: string;
    billedTo?: { label: string; value: string }
    rate?: { label: string; value: string }
    from?: { label: string; value: string }
    to?: { label: string; value: string }
    price?: string;
    capacity?: string
    remarks?: string
    pickupDate?: Moment
    unloadDate?: Moment

}

interface Errors {
    name?: string;
    phoneNo?: string;
}

interface Option {
    value: string;
    label: string;
}

export default function Shipment() {

    const params = useParams();
    const id = params.id;
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(true);
    const [locationList, setLocationList] = useState<Location[]>([])
    const [companyList, setCompanyList] = useState([])
    const [rateList, setRateList] = useState([])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleReactSelect = (option: SingleValue<Option>, name: string) => {

        if (name === "to" && formData.from?.value === option?.value) {
            toast.warn('From and To the same place?')
        }
        else if (name === "from" && formData.to?.value === option?.value) {
            toast.warn('From and To the same place?')
        }

        setFormData({ ...formData, [name]: option })
    }

    // const handleRate = (option: SingleValue<Option>, name: string) => {
    //     console.log(rateList)

    //     setFormData({
    //         ...formData, [name]: option,
    //         // price:"",
    //         from: data.from ? locationList.find((x: Option) => x.value === option.from) : "",
    //         to: data.to ? location.find((x: Option) => x.value === data.to) : "",


    //     })
    // }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true);
        e.preventDefault()

        const isValid = Object.values(errors).every(value => value === "");
        console.log(formData.unloadDate ? formData.unloadDate.toDate() : "")

        if (isValid) {
            try {
                const res = await fetch(`/api/shipment/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData, id: id,
                        billedTo:formData?.billedTo?.value,
                        from: formData?.from?.value,
                        to: formData?.to?.value,
                        pickupDate: formData.pickupDate ? formData.pickupDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
                        unloadDate: formData.unloadDate ? formData.unloadDate.format("YYYY-MM-DDTHH:mm:ssZ") : null,
                        // isPaid:false
                    }),
                });

                if (res.ok) {
                    toast.success("Data Successfully Saved!");
                    setTimeout(() => {
                        router.back()
                    }, 700);

                }
                else {
                    toast.error("Something went wrong, Please try again.");
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                }

                return await res.json();
            } catch (error) {
                toast.error("Something went wrong, Please try again.");
                console.error("Failed to submit user:", error);
                return null;
            }

        }
        else {
            toast.warn("Please fill in all required fields.");
            setIsLoading(false)
        }

    }

    const fetchLocation = async () => {

        try {
            const locationReq = await fetch('/api/location');
            if (!locationReq.ok) {
                toast.error("Something went wrong, Please try again.");
            }
            let location = await locationReq.json();

            location = location.map((obj: any) => ({
                label: `${obj.name} - ${obj.address}`,
                value: obj._id
            }))

            return location
        }
        catch (e) {
            toast.error('Error fetching location')
        }

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

    const fetchRate = async () => {

        try {
            const rateReq = await fetch('/api/rate');
            if (!rateReq.ok) {
                toast.error("Something went wrong, Please try again.");
            }
            let rate = await rateReq.json();

            rate = rate.map((obj: any) => ({
                ...obj,
                label: obj.name,
                value: obj._id
            }))
            console.log(rate)

            return rate
        }
        catch (e) {
            toast.error('Error fetching rate')
        }

    }

    const fetchData = async () => {

        try {
            const res = await fetch(`/api/shipment/${id}`);

            if (!res.ok) {
                toast.error("Something went wrong, Please try again.");
            }
            let data = await res.json();


            const location: Location[] = await fetchLocation();
            const company = await fetchCompany();
            // const rate = await fetchRate();

            data = {
                ...data,
                billedTo: data.billedTo ? company.find((x: Option) => x.value === data.billedTo) : "",
                // rate: data.rate ? rate.find((x: Option) => x.value === data.rate) : "",
                from: data.from ? location.find((x: Option) => x.value === data.from) : "",
                to: data.to ? location.find((x: Option) => x.value === data.to) : "",
                pickupDate: data.pickupDate ? moment(data.pickupDate, "YYYY-MM-DD HH:mm") : "",
                unloadDate: data.unloadDate ? moment(data.unloadDate, "YYYY-MM-DD HH:mm") : ""

            }

            setCompanyList(company)
            setLocationList(location)
            setFormData(data);
            setIsLoading(false);

        } catch (error) {
            toast.error("Something went wrong, Please try again.");
        }

    };

    const getCompany = async () => {
        const company = await fetchCompany();
        setCompanyList(company)

    }

    const getRate = async () => {
        const rate = await fetchRate();
        setRateList(rate)

    }

    const getLocation = async () => {

        const location: Location[] = await fetchLocation();
        setLocationList(location)
        setIsLoading(false);
    };

    const handleDatetime = (value: Moment | null, name: string) => {

        setFormData({
            ...formData,
            [name]: value
        })
    }


    useEffect(() => {


        getRate();

        if (id !== "new") {
            fetchData();
        }
        else {
            getLocation();
            getCompany();
        }

    }, [id])

    return (
        <div className="p-4">
            <div className="relative">
                <div className='p-5 rounded-lg bg-base-300 flex justify-between'>
                    <BackButton />
                    <div className='md:mx-80 card bg-primary-content text-neutral-content shadow-xl p-6'>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-2 gap-2 px-2">
                                <p className=" col-span-2 text-2xl text-center ">Shipment</p>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Billed To</span>
                                    </label>
                                    <StyledSelect
                                        onChange={handleReactSelect}
                                        options={companyList}
                                        name="billedTo"
                                        val={formData.billedTo || null}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.name}</p>
                                </div>
                                {/* <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Template </span>
                                    </label>
                                    <StyledSelect
                                        onChange={handleRate}
                                        options={rateList}
                                        name="rate"
                                        val={formData.rate || null}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.name}</p>
                                </div> */}
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">From</span>
                                    </label>
                                    <StyledSelect
                                        onChange={handleReactSelect}
                                        options={locationList}
                                        name="from"
                                        val={formData.from || null}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">To</span>
                                    </label>
                                    <StyledSelect
                                        onChange={handleReactSelect}
                                        options={locationList}
                                        name="to"
                                        val={formData?.to || null}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="label">
                                        <span className="label-text">Pickup Date and Time</span>
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DateTimePicker
                                            format="DD/MM/YYYY hh:mm A"
                                            value={formData.pickupDate}
                                            onChange={(value) => { handleDatetime(value, "pickupDate") }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="col-span-1">
                                    <label className="label">
                                        <span className="label-text">Unload Date and Time</span>
                                    </label>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DateTimePicker
                                            format="DD/MM/YYYY hh:mm A"
                                            value={formData.unloadDate}
                                            onChange={(value) => { handleDatetime(value, "unloadDate") }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                },
                                            }}

                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Capacity</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter Capacity"
                                        className="textarea textarea-bordered textarea-sm w-full"
                                        name="capacity"
                                        rows={2}
                                        onChange={handleChange}
                                        value={formData.capacity}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Remarks</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter Remarks"
                                        className="textarea textarea-bordered textarea-sm w-full"
                                        name="remarks"
                                        rows={2}
                                        onChange={handleChange}
                                        value={formData.remarks}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Rate (RM)</span>
                                    </label>
                                    <input
                                        placeholder="Enter amount"
                                        className="input input-sm input-bordered w-full"
                                        name="price"
                                        onChange={handleChange}
                                        // onBlur={(e) => validateNumber(e, setErrors)}
                                        value={formData.price}
                                    />
                                </div>
                                <button className="btn btn-info btn-sm col-span-2 mt-2">{id === "new" ? "Save" : "Update"}</button>
                            </div>
                        </form>
                    </div>
                    <div></div>
                    <LoadingOverlay isLoading={isLoading} />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
    )
}