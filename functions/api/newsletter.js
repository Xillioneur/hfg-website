export async function onRequestPost(context) {
  const { request, env } = context;
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
  }

  try {
    // REAL SQL: Insert into the 'newsletter' table
    await env.DB.prepare(
      "INSERT OR IGNORE INTO newsletter (email) VALUES (?)"
    ).bind(email).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}