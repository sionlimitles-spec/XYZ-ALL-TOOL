"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Download,
  Wrench,
  Library,
  Mail,
  MessageSquare,
  BookOpen,
} from "lucide-react";

const MENU = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/downloader", label: "Downloader", icon: Download },
  { href: "/utilities", label: "Utilities", icon: Wrench },
  { href: "/temp-mail", label: "Temp Mail", icon: Mail },
  { href: "/ai-chat", label: "AI Chat", icon: MessageSquare },
  { href: "/komik", label: "Komik", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-white/5 bg-black/20 p-4 gap-1">
      <div className="text-xl font-bold mb-6 px-3">
        XYZ<span className="text-[var(--accent)]">TOOL</span>
      </div>
      {MENU.map((m) => {
        const Icon = m.icon;
        const active = path === m.href;
        return (
          <Link
            key={m.href}
            href={m.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
              active
                ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            <Icon size={18} />
            {m.label}
          </Link>
        );
      })}
    </aside>
  );
}
