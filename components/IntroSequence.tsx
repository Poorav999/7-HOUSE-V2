"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function IntroSequence() {
    const [introFinished, setIntroFinished] = useState(() => {
        if (typeof window === 'undefined') return false;
        return sessionStorage.getItem("introPlayed") === "true";
    });
    const [isZooming, setIsZooming] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    if (introFinished) return null;

    const handleEnter = () => {
        setIsZooming(true);
        sessionStorage.setItem("introPlayed", "true");
        setTimeout(() => {
            setIntroFinished(true);
        }, 1500);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#0f0f0f] w-screen h-screen overflow-hidden origin-center flex items-center justify-center"
            initial={{ scale: 1, opacity: 1 }}
            animate={
                isZooming
                    ? { scale: 15, opacity: 0 }
                    : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            {/* Video Container */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    src="/intro999.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onEnded={() => {
                        handleEnter();
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Center Minecraft-Styled Text Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <Image 
                        src="/logo.png" 
                        alt="7HOUSES" 
                        width={180} 
                        height={180} 
                        className="w-32 md:w-48 h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    />
                    <motion.button
                        onClick={handleEnter}
                        disabled={isZooming}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1 
                        }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={`font-vt323 text-white text-2xl md:text-4xl font-bold tracking-widest uppercase hover:text-gray-200 transition-colors duration-300 cursor-pointer select-none ${
                            isZooming ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                        style={{ 
                            textShadow: '2px 2px 0 rgba(0,0,0,0.8), 4px 4px 0 rgba(0,0,0,0.6)',
                            lineHeight: '1.8'
                        }}
                    >
                        Click Anywhere<br />
                        to Enter<br />
                        the House
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}
