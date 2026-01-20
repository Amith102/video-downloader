"use client";

import { VideoData } from "@/lib/types";
import { Clock, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { motion } from "framer-motion";

interface RecentDownloadsProps {
    history: VideoData[];
    onClear: () => void;
    onSelect: (data: VideoData) => void;
}

export function RecentDownloads({ history, onClear, onSelect }: RecentDownloadsProps) {
    if (history.length === 0) return null;

    return (
        <div className="w-full max-w-xl mx-auto mt-12 px-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <Clock className="h-5 w-5" />
                    Recent Downloads
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                </Button>
            </div>

            <div className="space-y-3">
                {history.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={`${item.videoUrl}-${index}`}
                        className="group flex gap-3 p-2 rounded-2xl bg-white/50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-neutral-800/60 hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                        onClick={() => onSelect(item)}
                    >
                        {/* Thumbnail */}
                        <div className="relative h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/50 dark:border-white/5">
                            {item.thumbnail ? (
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-[10px] text-neutral-400">
                                    No Preview
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                            <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 truncate pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.title || "Untitled Video"}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider
                                    ${item.platform === 'instagram' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' : ''}
                                    ${item.platform === 'youtube' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : ''}
                                    ${item.platform === 'facebook' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                                `}>
                                    {item.platform}
                                </span>
                                {item.author && <span className="text-xs text-neutral-500 dark:text-neutral-500 truncate">{item.author}</span>}
                            </div>
                        </div>

                        <div className="flex items-center px-2">
                            <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
