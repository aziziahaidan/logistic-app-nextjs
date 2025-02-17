'use client';
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Staff() {
    const pathname = usePathname();
    useEffect(() => { console.log(pathname) }, [])

    return <div className="text-center">Staff</div>
}