export type Platform =
  | "tiktok"
  | "youtube"
  | "instagram"
  | "twitter"
  | "pinterest"
  | "unknown";

export function detectPlatform(url: string): Platform {
  const u = url.toLowerCase();
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("twitter.com") || u.includes("x.com")) return "twitter";
  if (u.includes("pinterest.")) return "pinterest";
  return "unknown";
}
