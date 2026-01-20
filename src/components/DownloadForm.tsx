"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { VideoData } from "@/lib/types";
import { ResultCard } from "./ResultCard";
import { Link2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { RecentDownloads } from "./RecentDownloads";

export function DownloadForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<VideoData | null>(null);
    const [history, setHistory] = useLocalStorage<VideoData[]>("reels-dl-history", []);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch("/api/detect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch video");
            }

            setResult(data);

            // Add to history if successful
            setHistory((prev) => {
                const newHistory = [data, ...prev.filter((item) => item.videoUrl !== data.videoUrl)].slice(0, 5);
                return newHistory;
            });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setUrl("");
        setError(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto px-4">
            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <div className="relative group">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500 will-change-transform"></div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-blue-500 transition-colors duration-300">
                                    <Link2 className="h-5 w-5" />
                                </div>
                                <Input
                                    placeholder="Paste Instagram, YouTube, or Facebook link..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-12 pr-28 h-16 text-lg bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-neutral-200/50 dark:border-white/10 shadow-xl shadow-blue-500/5 dark:shadow-blue-900/10 rounded-2xl focus:ring-0 focus:border-blue-500/50 transition-all duration-300"
                                    disabled={loading}
                                />
                                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                                    <AnimatePresence>
                                        {!url && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                            >
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-9 px-4 text-xs font-medium rounded-xl bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 backdrop-blur-md border border-neutral-200/50 dark:border-white/5 transition-all"
                                                    onClick={async () => {
                                                        try {
                                                            const text = await navigator.clipboard.readText();
                                                            if (text) setUrl(text);
                                                        } catch (err) {
                                                            console.error("Failed to read clipboard", err);
                                                        }
                                                    }}
                                                >
                                                    Paste
                                                </Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <Button
                                        type="submit"
                                        isLoading={loading}
                                        disabled={!url || loading}
                                        size="icon"
                                        className="h-11 w-11 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        <Search className="h-5 w-5 text-white" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center backdrop-blur-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <p className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Supports Instagram, YouTube & Facebook
                        </p>
                    </motion.form>
                ) : (
                    <div key="result" className="pt-4">
                        <ResultCard data={result} onReset={handleReset} />
                    </div>
                )}
            </AnimatePresence>

            {isClient && !result && (
                <RecentDownloads
                    history={history}
                    onClear={() => setHistory([])}
                    onSelect={(data) => setResult(data)}
                />
            )}
        </div>
    );
}
