export const runtime = "nodejs";

const BASE = "https://komiku-api.fly.dev/api/comic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const q = searchParams.get("q") ?? "";
  const endpoint = searchParams.get("endpoint") ?? "";

  let url = "";
  if (action === "search") url = `${BASE}/search/${encodeURIComponent(q)}`;
  else if (action === "detail") url = `${BASE}${endpoint}`;
  else if (action === "chapter") url = `${BASE}/chapter${endpoint}`;
  else return Response.json({ error: "Unknown action" }, { status: 400 });

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();
  return Response.json(data);
}
