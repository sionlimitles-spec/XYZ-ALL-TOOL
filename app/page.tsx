import Link from "next/link";

const TOOLS = [
  { href: "/downloader", title: "Downloader", desc: "TikTok & YouTube" },
  { href: "/utilities", title: "Utilities", desc: "QR, Password, Base64, Text, Color" },
  { href: "/temp-mail", title: "Temp Mail", desc: "Email sementara" },
  { href: "/komik", title: "Komik", desc: "Baca manga & manhwa" },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="glass-card glow-accent p-8">
        <h1 className="text-4xl font-bold mb-2">
          XYZ<span className="text-[var(--accent)]"> ALL TOOL</span>
        </h1>
        <p className="text-white/60">Semua tool yang kamu butuhkan dalam satu tempat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="glass-card p-6 hover:border-[var(--accent)]/50 transition"
          >
            <h3 className="font-semibold mb-1 text-[var(--accent)]">{t.title}</h3>
            <p className="text-sm text-white/60">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
