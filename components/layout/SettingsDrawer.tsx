"use client";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/hooks/useUIStore";

const ACCENTS = [
  { id: "violet", color: "#8b5cf6" },
  { id: "fuchsia", color: "#d946ef" },
  { id: "cyan", color: "#06b6d4" },
  { id: "emerald", color: "#10b981" },
  { id: "amber", color: "#f59e0b" },
  { id: "rose", color: "#f43f5e" },
  { id: "blue", color: "#3b82f6" },
];

export function SettingsDrawer() {
  const { settingsOpen, closeSettings, accent, setAccent } = useUIStore();
  if (!settingsOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={closeSettings} />
      <aside className="fixed right-0 top-0 h-full w-80 glass-card p-6 overflow-y-auto z-50 rounded-l-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Pengaturan</h2>
          <button className="btn-ghost btn" onClick={closeSettings}>
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm text-white/60 mb-3">Warna Aksen</h3>
            <div className="flex gap-2 flex-wrap">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    accent === a.id
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ background: a.color }}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm text-white/60 mb-3">Bahasa</h3>
            <select className="input">
              <option value="id">Indonesia</option>
              <option value="en">English</option>
              <option value="ms">Melayu</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ar">العربية</option>
              <option value="hi">हिन्दी</option>
              <option value="th">ไทย</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}
