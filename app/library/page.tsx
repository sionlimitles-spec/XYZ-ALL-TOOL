"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LibraryPage() {
  const supabase = createClient();
  const [tab, setTab] = useState<"favorites" | "history">("favorites");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setLogged(true);
      supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => setFavorites(data ?? []));
      supabase
        .from("history")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => setHistory(data ?? []));
    });
  }, []);

  if (!logged)
    return (
      <div className="glass-card p-6 max-w-md mx-auto">
        <p className="text-white/60">
          Data favorit dan riwayat akan muncul di sini setelah login dikonfigurasi.
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("favorites")}
          className={tab === "favorites" ? "tab-active" : "tab"}
        >
          Favorit
        </button>
        <button
          onClick={() => setTab("history")}
          className={tab === "history" ? "tab-active" : "tab"}
        >
          Riwayat
        </button>
      </div>

      <div className="glass-card p-6">
        {tab === "favorites" ? (
          favorites.length === 0 ? (
            <p className="text-white/60 text-sm">Belum ada favorit.</p>
          ) : (
            <div className="space-y-2">
              {favorites.map((f) => (
                <div key={f.id} className="p-3 rounded-lg bg-white/5 text-sm">
                  <span className="text-[var(--accent)]">{f.tool_slug}</span> —{" "}
                  {f.item_id}
                </div>
              ))}
            </div>
          )
        ) : history.length === 0 ? (
          <p className="text-white/60 text-sm">Belum ada riwayat.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="p-3 rounded-lg bg-white/5 text-sm">
                <span className="text-[var(--accent)]">{h.tool_slug}</span> —{" "}
                {h.action}: {h.result_summary}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
