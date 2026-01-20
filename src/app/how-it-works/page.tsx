export default function HowItWorks() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">How to Download Reels</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <div className="text-4xl mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Copy Link</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Open Instagram, YouTube, or Facebook and copy the link to the Reel or Short you want to download.
                    </p>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <div className="text-4xl mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Paste Link</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Paste the link into the input box on our homepage and click the search button.
                    </p>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <div className="text-4xl mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Download</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Preview the video and click the "Download Video" button to save it to your device.
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <a href="/" className="text-blue-600 hover:underline">Back to Home</a>
            </div>
        </div>
    );
}
