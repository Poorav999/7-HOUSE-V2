"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function IntroSequence() {
    const [introFinished, setIntroFinished] = useState(false);
    const [isZooming, setIsZooming] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const t = setTimeout(() => {
            setIsMounted(true);
            const introPlayed = sessionStorage.getItem("introPlayed") === "true";
            setIntroFinished(introPlayed);
        }, 0);
        return () => clearTimeout(t);
    }, []);

    if (!isMounted || introFinished) return null;

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

            {/* Clickable overlay to enter */}
            <div 
                className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
                onClick={handleEnter}
            >
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <Image 
                        src="/logo.png" 
                        alt="7HOUSES" 
                        width={300} 
                        height={300} 
                        className="w-48 md:w-80 h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
