export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { url, format } = await req.json();
  if (!url) return Response.json({ error: "URL kosong" }, { status: 400 });

  const u = url.toLowerCase();

  try {
    // TikTok
    if (u.includes("tiktok.com")) {
      const { tikfav } = await import("tikfav");
      const data: any = await tikfav(url);
      return Response.json({
        success: true,
        platform: "tiktok",
        title: data.title ?? "TikTok Video",
        video: data.video,
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

    // Platform generic
    const aio = await import("@lmna22/aio-downloader");
    const anyAio: any = aio;
    const fn = anyAio.aioDownload ?? anyAio.default;
    if (fn) {
      const data: any = await fn(url);
      return Response.json({
        success: true,
        platform: "generic",
        title: data.title ?? "Media",
        video: data.url ?? data.video,
      });
    }

    return Response.json(
      { success: false, error: "Platform tidak didukung" },
      { status: 400 }
    );
  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message ?? "Gagal" },
      { status: 500 }
    );
  }
}
