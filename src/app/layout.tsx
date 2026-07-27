import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";
import { BackToTop } from "@/components/BackToTop";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nexahire.example"),
  title: { default: "NexaHire — Intelligent Career Marketplace", template: "%s | NexaHire" },
  description: "Discover verified opportunities, explore standout companies, save roles, and build your next career move with NexaHire.",
  keywords: ["jobs", "careers", "hiring", "remote jobs", "technology jobs", "India jobs"],
  openGraph: {
    title: "NexaHire — Intelligent Career Marketplace",
    description: "Meaningful roles. Remarkable teams. One modern career marketplace.",
    type: "website",
    url: "/",
  },
};

const preferenceScript = `
(function () {
  try {
    var theme = localStorage.getItem('nexahire:theme');
    var dark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    var view = localStorage.getItem('nexahire:job-view');
    document.documentElement.dataset.jobView = view === 'grid' ? 'grid' : 'list';
  } catch (_) {
    document.documentElement.dataset.jobView = 'list';
  }
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
