"use client";
import { useRouter } from 'next/navigation';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

interface BackToListingProps {
    basePath: string;
}

export default function BackToListing({ basePath }: BackToListingProps) {
    const router = useRouter();
    return (


        <button className='btn btn-sm btn-neutral'
            onClick={() => router.push(basePath)
            }
        >
            <ArrowUturnLeftIcon className="h-4 w-4" />
        </button >
    )
}