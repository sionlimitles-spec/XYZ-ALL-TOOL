export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json({
        reply:
          "AI belum aktif. Pemilik situs perlu menambahkan GROQ_API_KEY di Vercel Environment Variables. Dapatkan gratis di console.groq.com",
      });
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "Kamu adalah asisten XYZ ALL TOOL. Jawab singkat dan akurat dalam bahasa yang sama dengan user.",
            },
            ...messages,
          ],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({
        reply: `Gagal memanggil AI: ${errText.slice(0, 200)}`,
      });
    }

    const data = await res.json();
    return Response.json({
      reply: data.choices?.[0]?.message?.content ?? "Tidak ada respons",
    });
  } catch (err: any) {
    return Response.json({
      reply: `Error: ${err?.message ?? "tidak diketahui"}`,
    });
  }
}
