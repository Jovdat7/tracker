export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/track") {
      const data = await request.json();

      const payload = {
        content: `📍 **User Location Received**
🕒 Time: ${data.time}
🌐 Latitude: ${data.latitude}
🌐 Longitude: ${data.longitude}`
      };

      await fetch(env.DISCORD_WEBHOOK, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });

      return new Response("Location sent!", { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  }
};
