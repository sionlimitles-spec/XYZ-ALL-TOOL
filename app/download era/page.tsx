"use client";
import { useState } from "react";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, format }),
      });
      setResult(await res.json());
    } catch (e: any) {
      setResult({ success: false, error: e.message });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="glass-card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Downloader</h1>
        <p className="text-sm text-white/60">TikTok atau YouTube — tempel URL di bawah.</p>
        <input
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
        <div className="flex gap-2">
          <button className={format === "mp4" ? "tab-active" : "tab"} onClick={() => setFormat("mp4")}>MP4</button>
          <button className={format === "mp3" ? "tab-active" : "tab"} onClick={() => setFormat("mp3")}>MP3</button>
        </div>
        <button onClick={submit} disabled={!url || loading} className="btn btn-primary w-full glow-accent">
          {loading ? "Memproses..." : "Download"}
        </button>
      </div>

      {result && (
        <div className="glass-card p-6">
          {result.success ? (
            <div className="space-y-3">
              <p className="font-medium">{result.title}</p>
              <a
                href={result.video ?? result.audio}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex"
              >
                Buka / Simpan
              </a>
            </div>
          ) : (
            <p className="text-rose-400">{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
          }
