declare module "@sasmeee/igdl" {
    const igdl: (url: string) => Promise<any[]>;
    export default igdl;
}

declare module "fb-downloader-scrapper" {
    export interface FacebookVideo {
        success: boolean;
        id: string;
        title: string;
        thumbnail: string;
        links: {
            "Download High Quality"?: string;
            "Download Low Quality"?: string;
            [key: string]: string | undefined;
        };
    }
    export function getFbVideoInfo(url: string): Promise<{
        title: string;
        thumbnail: string;
        sd: string;
        hd: string;
    }>;
    const fbDownloader: (url: string) => Promise<FacebookVideo>;
    export default fbDownloader;
}
