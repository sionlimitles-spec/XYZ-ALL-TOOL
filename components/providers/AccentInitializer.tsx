"use client";
import { useEffect } from "react";

export function AccentInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem("accent");
    if (saved) document.documentElement.setAttribute("data-accent", saved);
  }, []);
  return null;
}
