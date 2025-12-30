<script>
const WORKER_URL = "https://tracker.jovdat70.workers.dev/"; // Your Cloudflare Worker URL

function getLocation() {
  const statusEl = document.getElementById("status");

  // Check if browser supports geolocation
  if (!navigator.geolocation) {
    statusEl.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  statusEl.textContent = "Requesting permission...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const data = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        acc: position.coords.accuracy
      };

      // Send location to the Worker (which posts to Discord)
      fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then((res) => {
        if (res.ok) {
          statusEl.textContent = "Thanks! Location received successfully.";
        } else {
          statusEl.textContent = "Error sending data. Try again.";
          console.error("Worker response error:", res.status, res.statusText);
        }
      })
      .catch((err) => {
        statusEl.textContent = "Error sending data.";
        console.error("Fetch error:", err);
      });
    },
    (err) => {
      console.error("Geolocation error:", err);
      if (err.code === 1) statusEl.textContent = "Permission denied.";
      else if (err.code === 2) statusEl.textContent = "Position unavailable.";
      else if (err.code === 3) statusEl.textContent = "Timeout.";
      else statusEl.textContent = "Unknown error.";
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}
</script>
