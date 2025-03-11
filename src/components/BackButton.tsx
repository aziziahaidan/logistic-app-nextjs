"use client";
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
    const router = useRouter();
    return (

        <button className='btn btn-sm btn-neutral'
            onClick={() => router.back()}
        >
            <ArrowUturnLeftIcon className="h-4 w-4" />
        </button >
    )
}