// @ts-ignore
import { instagramGetUrl } from "instagram-url-direct";
import ytdl from "@distube/ytdl-core";
import { getFbVideoInfo } from "fb-downloader-scrapper";
import { VideoData } from "@/lib/types";

export { type VideoData };

export const detectPlatform = (url: string): VideoData["platform"] => {
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    if (url.includes("facebook.com") || url.includes("fb.watch")) return "facebook";
    return "unknown";
};

export const getInstagramVideo = async (url: string): Promise<VideoData> => {
    try {
        const data = await instagramGetUrl(url);
        if (!data || !data.url_list || data.url_list.length === 0) throw new Error("No data found");

        const videoUrl = data.url_list[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const thumbnail = (data.media_details && (data.media_details as any[])[0]?.thumbnail) || "";

        return {
            platform: "instagram",
            title: "Instagram Reel",
            thumbnail: thumbnail,
            videoUrl: videoUrl,
            author: "Instagram User"
        };
    } catch (e) {
        console.error("IGDL Error", e);
        throw new Error("Failed to fetch Instagram video");
    }
};

export const getYoutubeVideo = async (url: string): Promise<VideoData> => {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error("Invalid YouTube URL");
        }

        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' });
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });

        return {
            platform: "youtube",
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[0].url,
            videoUrl: format.url,
            audioUrl: audioFormat ? audioFormat.url : undefined,
            author: info.videoDetails.author.name
        };
    } catch (e) {
        console.error("YTDL Error", e);
        throw new Error("Failed to fetch YouTube video");
    }
};


export const getFacebookVideo = async (url: string): Promise<VideoData> => {
    try {
        const data = await getFbVideoInfo(url);

        // @ts-ignore
        if (!data || (!data.sd && !data.hd)) {
            throw new Error("Failed to fetch Facebook video");
        }

        return {
            platform: "facebook",
            title: data.title || "Facebook Reel",
            thumbnail: data.thumbnail || "",
            videoUrl: data.sd || data.hd || "",
            author: "Facebook User"
        }
    } catch (e) {
        console.error("FB Error", e);
        throw new Error("Failed to fetch Facebook video");
    }
}
