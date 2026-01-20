export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 prose dark:prose-invert">
            <h1>Privacy Policy</h1>
            <p>Last updated: January 2026</p>

            <h2>1. Information We Collect</h2>
            <p>We do not collect any personal information. We only process the public URLs you submit to fetch video content. We do not store your download history.</p>

            <h2>2. How We Use Information</h2>
            <p>The data processed (URLs) is used strictly to provide the download service you requested.</p>

            <h2>3. Third-Party Services</h2>
            <p>We may use third-party APIs to fetch content. These services are governed by their own privacy policies.</p>

            <div className="mt-8">
                <a href="/" className="no-underline text-blue-600 hover:underline">Back to Home</a>
            </div>
        </div>
    );
}
