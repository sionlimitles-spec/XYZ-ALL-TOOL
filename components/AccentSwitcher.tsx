"use client";
import { useEffect, useState } from "react";

const ACCENTS = ["violet", "fuchsia", "cyan", "emerald", "amber", "rose", "blue"];

export function AccentSwitcher() {
  const [accent, setAccent] = useState("violet");

  useEffect(() => {
    const saved = localStorage.getItem("accent");
    if (saved) {
      setAccent(saved);
      document.documentElement.setAttribute("data-accent", saved);
    }
  }, []);

  function change(a: string) {
    setAccent(a);
    document.documentElement.setAttribute("data-accent", a);
    localStorage.setItem("accent", a);
  }

  return (
    <div className="flex gap-1">
      {ACCENTS.map((a) => (
        <button
          key={a}
          onClick={() => change(a)}
          className={`w-5 h-5 rounded-full border-2 ${
            accent === a ? "border-white" : "border-transparent"
          }`}
          style={{
            background: {
              violet: "#8b5cf6",
              fuchsia: "#d946ef",
              cyan: "#06b6d4",
              emerald: "#10b981",
              amber: "#f59e0b",
              rose: "#f43f5e",
              blue: "#3b82f6",
            }[a],
          }}
        />
      ))}
    </div>
  );
}
