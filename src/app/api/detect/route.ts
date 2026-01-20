import { NextRequest, NextResponse } from "next/server";
import { detectPlatform, getFacebookVideo, getInstagramVideo, getYoutubeVideo } from "@/lib/downloaders";
import { VideoData } from "@/lib/types";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const platform = detectPlatform(url);
        let data: VideoData;

        switch (platform) {
            case "instagram":
                data = await getInstagramVideo(url);
                break;
            case "youtube":
                data = await getYoutubeVideo(url);
                break;
            case "facebook":
                data = await getFacebookVideo(url);
                break;
            case "unknown":
            default:
                return NextResponse.json({ error: "Unsupported platform or invalid URL" }, { status: 400 });
        }

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process request" },
            { status: 500 }
        );
    }
}
