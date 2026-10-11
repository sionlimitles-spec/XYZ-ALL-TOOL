import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { AccentSwitcher } from "@/components/AccentSwitcher";

export const metadata: Metadata = {
  title: "XYZ ALL TOOL",
  description: "Multi-tool dalam satu tempat",
};

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/downloader", label: "Downloader" },
  { href: "/utilities", label: "Utilities" },
  { href: "/temp-mail", label: "Temp Mail" },
  { href: "/komik", label: "Komik" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-accent="violet">
      <body>
        <div className="flex min-h-screen">
          <aside className="hidden md:flex flex-col w-56 border-r border-white/5 bg-black/20 p-4 gap-1">
            <div className="text-xl font-bold mb-6 px-3">
              XYZ<span className="text-[var(--accent)]">TOOL</span>
            </div>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5"
              >
                {n.label}
              </Link>
            ))}
          </aside>

          <main className="flex-1 flex flex-col">
            <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/20">
              <span className="text-sm text-white/60">XYZ ALL TOOL</span>
              <AccentSwitcher />
            </header>
            <div className="flex-1 p-6 overflow-y-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
