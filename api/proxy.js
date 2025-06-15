export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "url" query param' });
  }

  try {
    const targetUrl = decodeURIComponent(url);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // prevent host override
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (err) {
    console.error('[Proxy error]', err);
    res.status(500).json({ error: 'Proxy request failed', message: err.message });
  }
}
