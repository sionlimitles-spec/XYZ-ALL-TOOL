export const runtime = "nodejs";

const BASE = "https://api.tempmail.lol/v3";

export async function POST(req: Request) {
  const { action, token } = await req.json();

  if (action === "create") {
    const res = await fetch(`${BASE}/inbox/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return Response.json(await res.json());
  }

  if (action === "check") {
    const res = await fetch(`${BASE}/inbox?token=${token}`);
    return Response.json(await res.json());
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
