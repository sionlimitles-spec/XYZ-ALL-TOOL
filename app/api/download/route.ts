export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { url, format } = await req.json();
    if (!url) return Response.json({ success: false, error: "URL kosong" }, { status: 400 });

    const u = url.toLowerCase();

    if (u.includes("tiktok.com")) {
      const res = await fetch("https://www.tikwm.com/api/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `url=${encodeURIComponent(url)}&hd=1`,
      });
      const json = await res.json();
      if (json.code !== 0) throw new Error(json.msg || "Gagal TikTok");
      return Response.json({
        success: true,
        title: json.data.title ?? "TikTok Video",
        video: `https://www.tikwm.com${json.data.hdplay || json.data.play}`,
        audio: `https://www.tikwm.com${json.data.music}`,
      });
    }

    if (u.includes("youtube.com") || u.includes("youtu.be")) {
      return Response.json({
        success: false,
        error: "YouTube belum didukung di versi ini. Coba TikTok.",
      });
    }

    return Response.json({ success: false, error: "Platform tidak didukung" }, { status: 400 });
  } catch (e: any) {
    return Response.json({ success: false, error: e?.message ?? "Gagal" }, { status: 500 });
  }
}
