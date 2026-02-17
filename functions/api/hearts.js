export async function onRequestGet(context) {
  const { env, request } = context;
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get('gameId');

  if (!gameId) {
    return new Response(JSON.stringify({ error: "Missing gameId" }), { status: 400 });
  }

  // REAL SQL: Select the current count
  const result = await env.DB.prepare(
    "SELECT count FROM hearts WHERE game_id = ?"
  ).bind(gameId).first();

  return new Response(JSON.stringify({ hearts: result ? result.count : 0 }), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const { gameId } = await request.json();

  if (!gameId) {
    return new Response(JSON.stringify({ error: "Missing gameId" }), { status: 400 });
  }

  // REAL SQL: Atomic increment
  await env.DB.prepare(
    "INSERT INTO hearts (game_id, count) VALUES (?, 1) ON CONFLICT(game_id) DO UPDATE SET count = count + 1"
  ).bind(gameId).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}