
'use client';
import BackToListing from '../../../components/BackToListing';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { submitUser, getAllRoles } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { validateEmpty, validateNumber } from '@/components/Validation';


interface Role {
    _id: string;
    position: string;
};

interface FormData {
    name?: string;
    email?: string;
    telNo?: string;
    phoneNo?: string;
    address?: string;
    location?: string;
}

interface Errors {
    name?: string;
    phoneNo?: string;
    icNo?: string;
    position?: string
}

export default function Staff() {

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

            const result = await submitUser(formData, String(id));
            if (result.status === 200) {
                toast.success("Data Successfully Saved!");
                setTimeout(() => {
                    router.push(basePath);
                }, 700);
            } else {
                toast.error("Something went wrong, Please try again.");
            }
        }
        else {
            toast.warn("Please fill in all required fields.");
            setIsLoading(false)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            console.log(id)

            try {
                const res = await fetch(`/api/company/${id}`);

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

            // const userDetail = await getUserById(String(id));



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
                    <BackToListing basePath={basePath} />
                    <div className='md:mx-80 card bg-primary-content text-neutral-content shadow-xl p-6'>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className="grid grid-cols-2 gap-4 px-2">
                                <p className=" col-span-2 text-2xl text-center ">Company</p>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Company Name</span>
                                    </label>
                                    <input
                                        placeholder="Enter name"
                                        className="input input-sm input-bordered w-full"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={(e) => validateEmpty(e, setErrors)}
                                        // onBlur={validateForm}
                                        value={formData.name}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.name}</p>
                                </div>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        placeholder="Enter email"
                                        className="input input-sm input-bordered w-full"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}

                                    />
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
                                        onBlur={(e) => validateNumber(e, setErrors)}
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
                                        className="textarea textarea-bordered w-full"
                                        name="address"
                                        onChange={handleChange}
                                        value={formData.email}
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