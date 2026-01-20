import { DownloadForm } from "@/components/DownloadForm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black selection:bg-blue-500/30">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-500" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 transition-all duration-300">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            ReelsDL
          </span>
        </div>
        <ThemeToggle className="glass border-white/20 dark:border-white/10" />
      </header>

      {/* Main Content */}
      <main className="relative w-full max-w-5xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center z-10 text-center min-h-[calc(100vh-80px)]">
        <div className="space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            ✨ The Ultimate Social Downloader
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
            Download <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Reels</span>
            <br />
            in Seconds.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            Fast, secure, and visually stunning. Save content from Instagram, YouTube, and Facebook with a single click.
          </p>
        </div>

        <div className="w-full relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <DownloadForm />
        </div>
      </main>

      {/* Footer / Links */}
      <footer className="relative w-full text-center py-8 text-sm text-neutral-500 dark:text-neutral-500 z-10 flex gap-8 justify-center border-t border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <a href="/how-it-works" className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">How it works</a>
        <a href="/privacy" className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">Terms</a>
      </footer>
    </div>
  );
}
