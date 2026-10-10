"use client";
import { Settings } from "lucide-react";
import { useUIStore } from "@/lib/hooks/useUIStore";

export function Header() {
  const { openSettings } = useUIStore();
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/20 backdrop-blur">
      <div className="text-sm text-white/60">
        Selamat datang di XYZ ALL TOOL
      </div>
      <button className="btn-ghost btn" onClick={openSettings}>
        <Settings size={16} /> Pengaturan
      </button>
    </header>
  );
}
