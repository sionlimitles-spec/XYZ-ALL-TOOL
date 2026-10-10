import Link from "next/link";
import {
  Download,
  Wrench,
  Mail,
  MessageSquare,
  BookOpen,
  Library,
} from "lucide-react";

const TOOLS = [
  {
    href: "/downloader",
    title: "Universal Downloader",
    desc: "TikTok, YouTube, Instagram, Twitter, Pinterest — auto-detect URL.",
    icon: Download,
  },
  {
    href: "/utilities",
    title: "Utilities",
    desc: "QR Code, Password, Base64, Text Case, Color Picker.",
    icon: Wrench,
  },
  {
    href: "/temp-mail",
    title: "Temp Mail",
    desc: "Email sementara dari tempmail.lol.",
    icon: Mail,
  },
  {
    href: "/ai-chat",
    title: "AI Chat",
    desc: "Chat dengan AI streaming.",
    icon: MessageSquare,
  },
  {
    href: "/komik",
    title: "Komik",
    desc: "Baca manga, manhwa, manhua.",
    icon: BookOpen,
  },
  {
    href: "/library",
    title: "Library",
    desc: "Favorit dan riwayat aktivitas kamu.",
    icon: Library,
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="glass-card glow-accent p-8">
        <h1 className="text-4xl font-bold mb-2">
          XYZ<span className="text-[var(--accent)]"> ALL TOOL</span>
        </h1>
        <p className="text-white/60 max-w-2xl">
          Semua tool yang kamu butuhkan dalam satu tempat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="glass-card p-6 hover:border-[var(--accent)]/50 transition group"
            >
              <Icon
                size={28}
                className="text-[var(--accent)] mb-3 group-hover:scale-110 transition"
              />
              <h3 className="font-semibold mb-1">{t.title}</h3>
              <p className="text-sm text-white/60">{t.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
