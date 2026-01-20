"use client";

import { VideoData } from "@/lib/types";
import { Download, ExternalLink, Music } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

interface ResultCardProps {
    data: VideoData;
    onReset?: () => void;
}

export function ResultCard({ data, onReset }: ResultCardProps) {
    const downloadVideo = () => {
        if (data.videoUrl) {
            window.open(data.videoUrl, "_blank");
        }
    };

    const downloadAudio = () => {
        // If audioUrl exists, use it. Else, maybe fail or just video.
        // My downloaders.ts didn't explicitly separate audio url in all cases, 
        // but for now let's assume videoUrl contains audio.
        if (data.audioUrl) {
            window.open(data.audioUrl, "_blank");
        } else if (data.videoUrl) {
            window.open(data.videoUrl, "_blank");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto glass rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20"
        >
            <div className="relative aspect-video w-full bg-neutral-900/50">
                {data.videoUrl ? (
                    <video
                        src={data.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        loop
                        poster={data.thumbnail}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : data.thumbnail ? (
                    <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover"
                        unoptimized // External URLs
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-neutral-400">
                        No Preview
                    </div>
                )}
                {!data.videoUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                        <div className="text-white w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                    {data.platform}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg line-clamp-2 leading-tight mb-1 text-shadow-sm">
                                {data.title}
                            </h3>
                            {data.author && <p className="text-sm opacity-90 font-medium">{data.author}</p>}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl">
                <Button onClick={downloadVideo} className="w-full text-lg h-14 rounded-2xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all" variant="primary">
                    <Download className="mr-2 h-5 w-5" /> Download Video
                </Button>

                <div className="grid grid-cols-2 gap-3">
                    <Button onClick={downloadAudio} variant="secondary" className="w-full h-12 rounded-xl bg-white/60 dark:bg-white/5 border border-neutral-200/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md">
                        <Music className="mr-2 h-4 w-4" /> Audio
                    </Button>
                    <Button onClick={onReset} variant="ghost" className="w-full h-12 rounded-xl hover:bg-neutral-100/50 dark:hover:bg-white/5">
                        Search Another
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
