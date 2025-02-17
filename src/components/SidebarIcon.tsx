"use client";
import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { useRouter } from "next/navigation";

interface SidebarIconProps {
    label: string;
    path: any;
    width?: string;
    height?: string;
    loop?: boolean;
    hover?: boolean;
    active?: boolean;
    updateSetActive: (label: string) => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ label, path, width = "1.75rem", height = "1.75rem", loop = false, hover = false, active = false, updateSetActive }) => {

    const lottieContainer = useRef<HTMLDivElement | null>(null);
    const animationInstance = useRef<AnimationItem | null>(null);
    const router = useRouter();



    const handleMouseEnter = () => {
        if (hover && animationInstance.current) {
            animationInstance.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (hover && animationInstance.current) {
            animationInstance.current.stop();
        }
    };

    const handleClick = (label: string) => {
        router.push(`/${label}`)
        updateSetActive(label)
    }

    useEffect(() => {
        if (lottieContainer.current) {
            animationInstance.current = lottie.loadAnimation({
                container: lottieContainer.current,
                renderer: 'svg',
                loop,
                autoplay: !hover,
                animationData: path,
            });
        }
        return () => {
            animationInstance.current?.destroy();
        };
    }, [path, loop, hover]);

    return (
        <a
            className={`flex-grow my-1 ${active ? "active" : ""}`}
            onClick={() => handleClick(label)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={lottieContainer}
                style={{ width, height }}
            ></div>
            <div className='ml-2 capitalize text-left'>{label}</div>
        </a>

    );
};

export default SidebarIcon;
