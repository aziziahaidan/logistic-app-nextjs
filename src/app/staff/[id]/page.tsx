
'use client';
import BackToListing from '../../../components/BackToListing';
import { usePathname, useParams } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { getUserById, submitUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';
export default function Staff() {

    const params = useParams();
    const id = params.id;
    const pathname = usePathname();
    const basePath = '/' + pathname.split('/')[1];
    const router = useRouter();

    interface FormData {
        name?: string;
        email?: string;
        phoneNo?: string;
        icNo?: string;
        dateOfBirth?: string;
        joinDate?: string;
    }

    const [formData, setFormData] = useState<FormData>({})
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const result = await submitUser(formData, String(id));
        router.push(basePath);

    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserById(String(id));
            setFormData(result);
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
                                        value={formData.name}
                                    />
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
                                        value={formData.phoneNo}

                                    />
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
                                        value={formData.icNo}

                                    />
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
                                <button className="btn btn-info btn-sm col-span-2 mt-2">{id === "new" ? "Save" : "Update"}</button>
                            </div>
                        </form>
                    </div>
                    <div></div>
                    <LoadingOverlay isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}