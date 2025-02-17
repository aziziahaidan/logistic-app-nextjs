import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface AnimatedIconProps {
    path: any;
    width?: string;
    height?: string;
    loop?: boolean;
    hover?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ path, width = "50px", height = "50px", loop = false, hover = false }) => {
    const lottieContainer = useRef<HTMLDivElement | null>(null);
    const animationInstance = useRef<AnimationItem | null>(null);

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

    return (
        <div
            ref={lottieContainer}
            style={{ width, height }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        ></div>
    );
};

export default AnimatedIcon;
