addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL"

async function handleRequest(request) {
  try {
    const data = await request.json()
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📍 New location\nLat: ${data.lat}\nLon: ${data.lon}\nAccuracy: ±${data.acc}m`
      })
    })
    return new Response(JSON.stringify({status: "ok"}), {status: 200})
  } catch (err) {
    return new Response(JSON.stringify({status: "error", message: err.message}), {status: 500})
  }
}
