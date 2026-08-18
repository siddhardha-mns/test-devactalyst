/* eslint-env node */
import { isAdminRequest } from './admin-auth.js';

const scriptUrl = 'https://script.google.com/macros/s/AKfycbx8CyDgfDU98UvTeqYSKB69Eo9OxxHZth2GzMpIg12-CBTIrZFahZk-MDbQdLLxhDAdLg/exec';

export default async function handler(req, res) {
  if (!isAdminRequest(req)) return res.status(401).json({ error: 'Unauthorised.' });
  const secret = process.env.APPS_SCRIPT_ADMIN_SECRET;
  if (!secret) return res.status(503).json({ error: 'Apps Script admin secret is not configured.' });

  const payload = req.method === 'GET'
    ? { secret, action: 'adminData' }
    : { ...req.body, secret };

  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return res.status(response.ok && result.ok ? 200 : 502).json(result);
  } catch (error) {
    return res.status(502).json({ error: error instanceof Error ? error.message : 'Apps Script request failed.' });
  }
}
