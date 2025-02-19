"use client"

interface LoadingOverlayProps {
    isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
    return (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-base-300 bg-opacity-75 rounded-lg">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            )}
        </>)
}