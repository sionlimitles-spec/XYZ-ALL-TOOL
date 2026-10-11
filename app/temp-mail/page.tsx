"use client";
import { useState, useEffect } from "react";

export default function TempMailPage() {
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function create() {
    setLoading(true);
    try {
      const res = await fetch("/api/tempmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create" }),
      });
      const data = await res.json();
      setToken(data.token);
      setAddress(data.address);
    } catch {
      alert("Gagal membuat inbox");
    }
    setLoading(false);
  }

  async function check() {
    if (!token) return;
    try {
      const res = await fetch("/api/tempmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check", token }),
      });
      const data = await res.json();
      setEmails(data.emails ?? []);
    } catch {}
  }

  useEffect(() => {
    if (!token) return;
    const i = setInterval(check, 5000);
    return () => clearInterval(i);
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="glass-card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Temp Mail</h1>
        <p className="text-sm text-white/60">Email sementara dari tempmail.lol</p>
        <button onClick={create} disabled={loading} className="btn btn-primary glow-accent">
          {loading ? "Membuat..." : "Generate Email"}
        </button>
        {address && (
          <div className="p-4 rounded-lg bg-white/5 space-y-2">
            <p className="text-xs text-white/60">Alamat Email:</p>
            <p className="font-mono text-sm break-all">{address}</p>
            <button className="btn-ghost btn" onClick={() => navigator.clipboard.writeText(address)}>Copy</button>
          </div>
        )}
      </div>

      <div className="glass-card p-6">
        <h2 className="font-semibold mb-3">Inbox ({emails.length})</h2>
        {emails.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada email masuk.</p>
        ) : (
          <div className="space-y-2">
            {emails.map((e, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-sm">{e.subject}</p>
                <p className="text-xs text-white/60">{e.from}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
