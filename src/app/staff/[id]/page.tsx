
'use client';
import BackToListing from '../../../components/BackToListing';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { getUserById, submitUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { validateEmpty, validateNumber } from '@/components/Validation';
import { getAllRoles } from '@/actions/auth';


interface Role {
    _id: string;
    position: string;
};

interface FormData {
    name?: string;
    email?: string;
    phoneNo?: string;
    icNo?: string;
    dateOfBirth?: string;
    joinDate?: string;
    roleId?: string;
}

interface Errors {
    name?: string;
    phoneNo?: string
    icNo?: string
}

export default function Staff() {

    const [roleList, setRoleList] = useState<Role[]>([]);




    const params = useParams();
    const id = params.id;
    const pathname = usePathname();
    const basePath = '/' + pathname.split('/')[1];
    const router = useRouter();



    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
            const userDetail = await getUserById(String(id));
            let roles: Role[] = await getAllRoles();

            roles = roles.map((obj) => ({
                ...obj,
                value: obj._id,
                label: obj.position
            }));

            setRoleList(roles);
            setFormData(userDetail);
            setIsLoading(false);
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
                                <p className=" col-span-2 text-2xl text-center ">Staff</p>
                                <div className='col-span-2'>
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        placeholder="Enter your name"
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
                                        placeholder="Enter your email"
                                        className="input input-sm input-bordered w-full"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}

                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Phone No.</span>
                                    </label>
                                    <input
                                        placeholder="Enter your Phone No"
                                        className="input input-sm input-bordered w-full"
                                        name="phoneNo"
                                        onChange={handleChange}
                                        onBlur={(e) => validateNumber(e, setErrors)}
                                        value={formData.phoneNo}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.phoneNo}</p>
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">IC No.</span>
                                    </label>
                                    <input
                                        placeholder="Enter your IC No"
                                        className="input input-sm input-bordered w-full"
                                        name="icNo"
                                        onChange={handleChange}
                                        onBlur={(e) => validateNumber(e, setErrors)}
                                        value={formData.icNo}
                                    />
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.icNo}</p>

                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Date of Birth</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-sm input-bordered w-full"
                                        name="dateOfBirth"
                                        onChange={handleChange}
                                        value={formData.dateOfBirth}

                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Join Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-sm input-bordered w-full"
                                        name="joinDate"
                                        onChange={handleChange}
                                        value={formData.joinDate}
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <label className="label">
                                        <span className="label-text">Join Date</span>
                                    </label>
                                    <select
                                        name="roleId"
                                        onChange={(e) => {
                                            handleSelect(e);
                                            validateEmpty(e, setErrors);
                                        }}
                                        value={formData.roleId}
                                        className="select select-sm w-full">
                                        <option value="">{"--Please Select--"}</option>
                                        {roleList.map((obj) => (
                                            <option key={obj._id} value={obj._id}>
                                                {obj.position}
                                            </option>
                                        ))}
                                    </select>
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