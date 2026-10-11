export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { url, format } = await req.json();
  if (!url) return Response.json({ error: "URL kosong" }, { status: 400 });

  const u = url.toLowerCase();

  try {
    // TikTok
    if (u.includes("tiktok.com")) {
      const { download } = await import("@silent-tech-offc/ttdl");
      const data = await download(url);
      return Response.json({
        success: true,
        platform: "tiktok",
        title: data.title ?? "TikTok Video",
        video: data.video ?? data.no_watermark,
        music: data.music,
      });
    }

    // YouTube
    if (u.includes("youtube.com") || u.includes("youtu.be")) {
      const ytdl = (await import("@distube/ytdl-core")).default;
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;

      if (format === "mp3") {
        const audio = ytdl.filterFormats(info.formats, "audioonly")[0];
        return Response.json({
          success: true,
          platform: "youtube",
          title,
          audio: audio?.url,
        });
      }

      const video = ytdl.filterFormats(info.formats, "videoandaudio")[0];
      return Response.json({
        success: true,
        platform: "youtube",
        title,
        video: video?.url,
      });
    }

    return Response.json(
      { success: false, error: "Platform belum didukung. Coba TikTok atau YouTube." },
      { status: 400 }
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message ?? "Gagal memproses URL" },
      { status: 500 }
    );
  }
}
