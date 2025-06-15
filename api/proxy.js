// pages/api/proxy.ts
export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || typeof targetUrl !== "string") {
    return res.status(400).json({ error: "Missing or invalid URL" });
  }

  const method = req.method;
  const headers = { ...req.headers };
  delete headers.host;

  try {
    const proxyRes = await fetch(targetUrl, {
      method,
      headers,
      body: method !== "GET" && method !== "HEAD" ? req.body : undefined,
    });

    // Forward response headers (especially CORS-related ones)
    res.status(proxyRes.status);
    proxyRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const data = await proxyRes.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", detail: error.message });
  }
}
