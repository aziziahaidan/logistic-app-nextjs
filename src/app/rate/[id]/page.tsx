
'use client';
import BackToListing from '../../../components/BackToListing';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { validateEmpty, validateNumber } from '@/components/Validation';
import { SingleValue } from 'react-select';
import StyledSelect from '@/components/StyledSelect';
// import { fetchApi } from '@/helper/FetchApi';

interface Location {
    label: string;
    value: string;
}

interface FormData {
    name?: string;
    from?: { label: string; value: string }
    to?: { label: string; value: string }
    price?: string;
    capacity?: string
    remarks?: string

}

interface Errors {
    name?: string;
    phoneNo?: string;
}

interface Option {
    value: string;
    label: string;
}

export default function Rate() {

    const params = useParams();
    const id = params.id;
    const pathname = usePathname();
    const basePath = '/' + pathname.split('/')[1];
    const router = useRouter();

    const [locationList, setLocationList] = useState<Location[]>([])
    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleReactSelect = (option: SingleValue<Option>, name: string) => {

        if (name === "to" && formData.from?.value === option?.value) {
            toast.warn('From and To the same place?')
        }
        else if (name === "from" && formData.to?.value === option?.value){
            toast.warn('From and To the same place?')
        }

        setFormData({ ...formData, [name]: option })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true);
        e.preventDefault()

        const isValid = Object.values(errors).every(value => value === "");

        if (isValid) {
            try {
                const res = await fetch(`/api/rate/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData, id: id,
                        from: formData?.from?.value,
                        to: formData?.to?.value
                    }),
                });

                if (res.ok) {
                    toast.success("Data Successfully Saved!");
                    setTimeout(() => {
                        router.push(basePath);
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
                // ...obj,
                label: `${obj.name} - ${obj.address}`,
                value: obj._id
            }))

            return location
        }
        catch (e) {
            toast.error('Error fetching location')

        }



    }

    const fetchData = async () => {

        try {
            const res = await fetch(`/api/rate/${id}`);

            if (!res.ok) {
                toast.error("Something went wrong, Please try again.");
            }
            let data = await res.json();


            const location: Location[] = await fetchLocation();

            data = {
                ...data,
                from: data.from ? location.find((x) => x.value === data.from) : "",
                to: data.to ? location.find((x) => x.value === data.to) : ""
                // position: data.roleId ? roles.find(x => x._id === data.roleId)?._id : ""

            }

            setLocationList(location)
            setFormData(data);
            setIsLoading(false);

        } catch (error) {
            toast.error("Something went wrong, Please try again.");
        }

    };


    const getLocation = async () => {

        const location: Location[] = await fetchLocation();
        setLocationList(location)
        setIsLoading(false);
    };


    useEffect(() => {


        if (id !== "new") {
            fetchData();
        }
        else {
            getLocation();
        }

    }, [id])

    return (
        <div className="p-4">
            <div className="relative">
                <div className='p-5 rounded-lg bg-base-300 flex justify-between'>
                    <BackToListing basePath={basePath} />
                    <div className='md:mx-80 card bg-primary-content text-neutral-content shadow-xl p-6'>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-2 gap-2 px-2">
                                <p className=" col-span-2 text-2xl text-center ">Rate</p>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Shipment Name</span>
                                    </label>
                                    <input
                                        placeholder="Enter name"
                                        className="input input-sm input-bordered w-full"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={(e) => validateEmpty(e, setErrors)}
                                        value={formData.name}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.name}</p>
                                </div>
                                <div className='col-span-1'>
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
                                <div className='col-span-1'>
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
                                        <span className="label-text">Standard Rate (RM)</span>
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