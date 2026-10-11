"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function UtilitiesPage() {
  const [tab, setTab] = useState("qr");
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["qr", "password", "base64", "case", "color"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "tab-active" : "tab"}>
            {t}
          </button>
        ))}
      </div>
      <div className="glass-card p-6">
        {tab === "qr" && <QrTool />}
        {tab === "password" && <PasswordTool />}
        {tab === "base64" && <Base64Tool />}
        {tab === "case" && <CaseTool />}
        {tab === "color" && <ColorTool />}
      </div>
    </div>
  );
}

function QrTool() {
  const [text, setText] = useState("");
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current && text) QRCode.toCanvas(ref.current, text, { width: 240 });
  }, [text]);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">QR Code</h2>
      <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Teks atau URL" />
      <canvas ref={ref} className="bg-white rounded-lg p-2" />
    </div>
  );
}

function PasswordTool() {
  const [len, setLen] = useState(16);
  const [pwd, setPwd] = useState("");
  function gen() {
    const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const a = new Uint32Array(len);
    crypto.getRandomValues(a);
    setPwd(Array.from(a, (x) => c[x % c.length]).join(""));
  }
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Password Generator</h2>
      <input type="number" min={8} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} className="input" />
      <button className="btn btn-primary" onClick={gen}>Generate</button>
      {pwd && <div className="p-3 rounded-lg bg-white/5 font-mono text-sm break-all">{pwd}</div>}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Base64</h2>
      <textarea className="input" rows={4} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => setOut(btoa(input))}>Encode</button>
        <button className="btn-ghost btn" onClick={() => { try { setOut(atob(input)); } catch { setOut("Bukan Base64 valid"); } }}>Decode</button>
      </div>
      <div className="p-3 rounded-lg bg-white/5 font-mono text-sm break-all">{out}</div>
    </div>
  );
}

function CaseTool() {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Text Case</h2>
      <textarea className="input" rows={4} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <button className="tab" onClick={() => setInput(input.toUpperCase())}>UPPER</button>
        <button className="tab" onClick={() => setInput(input.toLowerCase())}>lower</button>
        <button className="tab" onClick={() => setInput(input.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()))}>Title</button>
      </div>
    </div>
  );
}

function ColorTool() {
  const [color, setColor] = useState("#8b5cf6");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Color Picker</h2>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-24 h-24 rounded-lg bg-transparent" />
      <div className="p-3 rounded-lg bg-white/5 font-mono text-sm">{color.toUpperCase()}</div>
    </div>
  );
}
