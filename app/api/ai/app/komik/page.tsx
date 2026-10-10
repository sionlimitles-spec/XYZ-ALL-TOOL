"use client";
import { useState } from "react";
import Link from "next/link";

export default function KomikPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);

  async function search() {
    setLoading(true);
    setDetail(null);
    setChapter(null);
    const res = await fetch(
      `/api/komik?action=search&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setResults(data.data ?? []);
    setLoading(false);
  }

  async function openDetail(endpoint: string) {
    setLoading(true);
    const res = await fetch(
      `/api/komik?action=detail&endpoint=${encodeURIComponent(endpoint)}`
    );
    const data = await res.json();
    setDetail(data.data);
    setLoading(false);
  }

  async function openChapter(endpoint: string) {
    setLoading(true);
    const res = await fetch(
      `/api/komik?action=chapter&endpoint=${encodeURIComponent(endpoint)}`
    );
    const data = await res.json();
    setChapter(data.data);
    setLoading(false);
  }

  // Reader view
  if (chapter) {
    return (
      <div className="max-w-3xl mx-auto space-y-2">
        <button className="btn-ghost btn mb-4" onClick={() => setChapter(null)}>
          Kembali
        </button>
        <h1 className="text-xl font-bold mb-4">{chapter.title}</h1>
        {chapter.image?.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={`page-${i}`}
            className="w-full rounded-lg"
          />
        ))}
      </div>
    );
  }

  // Detail view
  if (detail) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <button className="btn-ghost btn" onClick={() => setDetail(null)}>
          Kembali
        </button>
        <div className="glass-card p-6 flex gap-4">
          {detail.thumbnail && (
            <img
              src={detail.thumbnail}
              alt={detail.title}
              className="w-32 h-44 object-cover rounded-lg"
            />
          )}
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{detail.title}</h1>
            <p className="text-sm text-white/60">{detail.author}</p>
            <p className="text-sm text-white/60">{detail.status}</p>
            <div className="flex gap-1 flex-wrap">
              {detail.genre?.map((g: string) => (
                <span
                  key={g}
                  className="text-xs px-2 py-1 rounded bg-[var(--accent)]/20 text-[var(--accent)]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="font-semibold mb-3">Daftar Chapter</h2>
          <div className="space-y-1">
            {detail.chapter_list?.map((c: any) => (
              <button
                key={c.endpoint}
                onClick={() => openChapter(c.endpoint)}
                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Search view
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-semibold mb-4">Komik</h1>
        <div className="flex gap-2">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Cari manga, manhwa, manhua..."
          />
          <button className="btn btn-primary" onClick={search}>
            Cari
          </button>
        </div>
      </div>

      {loading && <p className="text-white/60">Memuat...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((m, i) => (
          <button
            key={i}
            onClick={() => openDetail(m.endpoint)}
            className="glass-card p-3 text-left hover:border-[var(--accent)]/50 transition"
          >
            {m.image && (
              <img
                src={m.image}
                alt={m.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}
            <p className="font-medium text-sm line-clamp-2">{m.title}</p>
            <p className="text-xs text-white/60">{m.type}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
