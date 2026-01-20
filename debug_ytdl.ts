
import { getYoutubeVideo } from "./src/lib/downloaders";

async function test() {
    try {
        console.log("Testing YouTube Download...");
        // A generic non-copyrighted or simple video for testing
        const url = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
        const data = await getYoutubeVideo(url);
        console.log("Success:", data);
    } catch (e) {
        console.error("Failed:", e);
    }
}

test();
