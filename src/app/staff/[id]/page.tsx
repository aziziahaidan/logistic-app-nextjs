
'use client';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { submitUser, getAllRoles } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import { validateAll, validateEmpty, validateNumber } from '@/components/Validation';
import BackButton from '../../../components/BackButton';


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
    position?: string;
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

    const [roleList, setRoleList] = useState<Role[]>([]);
    const [formData, setFormData] = useState<FormData>({})
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(true);

    const touched = useRef(false);

    const validateForm = () => {
        toast.warn("Please fill in all required fields.");
        validateAll(['name', 'phoneNo', 'icNo'])
        setIsLoading(false)
    }

    const checkTouched = () => {
        if (touched.current) return;

        if (Object.keys(formData).length !== 0) {
            touched.current = true;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        checkTouched();
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true);
        e.preventDefault();

        if (!touched.current) {
            validateForm();
            return
        }

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

            try {
                const res = await fetch(`/api/users/${id}`);

                if (!res.ok) {
                    toast.error("Something went wrong, Please try again.");
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();

                let roles: Role[] = await getAllRoles();

                roles = roles.map((obj) => ({
                    ...obj,
                    value: obj._id,
                    label: obj.position
                }));

                setRoleList(roles);
                setFormData({
                    ...data,
                    position: data.roleId ? roles.find(x => x._id === data.roleId)?._id : ""
                });
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
                    <BackButton />
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
                                        <span className="label-text">Position</span>
                                    </label>
                                    <select
                                        name="position"
                                        onChange={(e) => {
                                            handleSelect(e);
                                            validateEmpty(e, setErrors);
                                        }}
                                        value={formData.position}
                                        className="select select-sm w-full">
                                        <option value="">{"--Please Select--"}</option>
                                        {roleList.map((obj) => (
                                            <option key={obj._id} value={obj._id}>
                                                {obj.position}
                                            </option>
                                        ))}
                                    </select>
                                    <p className='text-xs text-error mt-1 ms-1'>{errors.position}</p>
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