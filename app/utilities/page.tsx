"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

const TABS = [
  { id: "qr", label: "QR Code" },
  { id: "password", label: "Password" },
  { id: "base64", label: "Base64" },
  { id: "case", label: "Text Case" },
  { id: "color", label: "Color Picker" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function UtilitiesPage() {
  const [active, setActive] = useState<TabId>("qr");
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={active === t.id ? "tab-active" : "tab"}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="glass-card p-6">
        {active === "qr" && <QrTool />}
        {active === "password" && <PasswordTool />}
        {active === "base64" && <Base64Tool />}
        {active === "case" && <CaseTool />}
        {active === "color" && <ColorTool />}
      </div>
    </div>
  );
}

function QrTool() {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && text) {
      QRCode.toCanvas(canvasRef.current, text, { width: 240 });
    }
  }, [text]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">QR Code Generator</h2>
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan teks atau URL"
      />
      <canvas ref={canvasRef} className="bg-white rounded-lg p-2" />
    </div>
  );
}

function PasswordTool() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");

  function generate() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const pwd = Array.from(arr, (x) => chars[x % chars.length]).join("");
    setPassword(pwd);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Password Generator</h2>
      <input
        type="number"
        min={8}
        max={64}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="input"
      />
      <button className="btn btn-primary" onClick={generate}>
        Generate
      </button>
      {password && (
        <div className="p-3 rounded-lg bg-white/5 font-mono text-sm break-all">
          {password}
        </div>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Base64 Encoder / Decoder</h2>
      <textarea
        className="input"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Teks input"
      />
      <div className="flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => setOutput(btoa(input))}
        >
          Encode
        </button>
        <button
          className="btn-ghost btn"
          onClick={() => {
            try {
              setOutput(atob(input));
            } catch {
              setOutput("Input bukan Base64 valid");
            }
          }}
        >
          Decode
        </button>
      </div>
      <div className="p-3 rounded-lg bg-white/5 font-mono text-sm break-all">
        {output}
      </div>
    </div>
  );
}

function CaseTool() {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Text Case Converter</h2>
      <textarea
        className="input"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <button className="tab" onClick={() => setInput(input.toUpperCase())}>
          UPPER
        </button>
        <button className="tab" onClick={() => setInput(input.toLowerCase())}>
          lower
        </button>
        <button
          className="tab"
          onClick={() =>
            setInput(
              input.replace(/\w\S*/g, (t) =>
                t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
              )
            )
          }
        >
          Title
        </button>
      </div>
    </div>
  );
}

function ColorTool() {
  const [color, setColor] = useState("#8b5cf6");
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Color Picker</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-24 h-24 rounded-lg bg-transparent"
      />
      <div className="p-3 rounded-lg bg-white/5 font-mono text-sm">
        {color.toUpperCase()}
      </div>
    </div>
  );
}
