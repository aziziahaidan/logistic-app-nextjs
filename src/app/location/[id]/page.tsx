
'use client';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { validateEmpty, validateNumber } from '@/components/Validation';
import BackButton from '../../../components/BackButton';

interface FormData {
    name?: string;
    telNo?: string;
    phoneNo?: string;
    address?: string;
    pinpoint?: string;
}

interface Errors {
    name?: string;
    phoneNo?: string;
}

export default function Location() {

    const params = useParams();
    const id = params.id;
    const pathname = usePathname();
    const basePath = '/' + pathname.split('/')[1];
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true);
        e.preventDefault()

        const isValid = Object.values(errors).every(value => value === "");

        if (isValid) {
            try {
                const res = await fetch(`/api/location/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...formData, id: id }),
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

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch(`/api/location/${id}`);

                if (!res.ok) {
                    toast.error("Something went wrong, Please try again.");
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();

                setFormData(data);
                setIsLoading(false);

            } catch (error) {
                toast.error("Something went wrong, Please try again.");
            }

        };

        if (id !== "new") {
            fetchData();
        }
        else {
            setIsLoading(false);
        }

    }, [id])

    return (
        <div className="p-4">
            <div className="relative">
                <div className='p-5 rounded-lg bg-base-300 flex justify-between'>
                    <BackButton />
                    <div className='md:mx-80 card bg-primary-content text-neutral-content shadow-xl p-6'>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-2 gap-4 px-2">
                                <p className=" col-span-2 text-2xl text-center ">Location</p>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Location Name</span>
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
                                        <span className="label-text">Tel No.</span>
                                    </label>
                                    <input
                                        placeholder="Enter Phone No"
                                        className="input input-sm input-bordered w-full"
                                        name="telNo"
                                        onChange={handleChange}
                                        // onBlur={(e) => validateNumber(e, setErrors)}
                                        value={formData.telNo}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Phone No.</span>
                                    </label>
                                    <input
                                        placeholder="Enter IC No"
                                        className="input input-sm input-bordered w-full"
                                        name="phoneNo"
                                        onChange={handleChange}
                                        onBlur={(e) => validateNumber(e, setErrors)}
                                        value={formData.phoneNo}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.phoneNo}</p>
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter address"
                                        className="textarea textarea-bordered textarea-sm w-full"
                                        name="address"
                                        rows={4}
                                        onChange={handleChange}
                                        value={formData.address}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Pinpoint</span>
                                    </label>
                                    <input
                                        placeholder="Enter Pinpoint"
                                        className="input input-sm input-bordered w-full"
                                        name="pinpoint"
                                        onChange={handleChange}
                                        value={formData.pinpoint}
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
    )
}