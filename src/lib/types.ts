export interface VideoData {
    platform: "instagram" | "youtube" | "facebook" | "unknown";
    title: string;
    thumbnail: string;
    videoUrl: string;
    audioUrl?: string;
    author?: string;
}
