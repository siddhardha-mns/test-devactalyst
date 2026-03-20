/* eslint-env node */
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

/** Escape HTML entities and strip null bytes */
const sanitize = (s) =>
  String(s)
    .replace(/\0/g, '')
    .replace(/[&<>"'`=/]/g, (m) => HTML_ESCAPE_MAP[m] ?? m);

const normalizeContactBody = (body = {}) => ({
  name: String(body?.name ?? body?.Name ?? '').slice(0, 100),
  email: String(body?.email ?? body?.Email ?? '').slice(0, 200),
  subject: String(body?.subject ?? body?.Subject ?? '').slice(0, 150),
  message: String(body?.message ?? body?.Message ?? '').slice(0, 2000),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let requestBody = req.body || {};

    if (typeof requestBody === 'string') {
      try {
        requestBody = JSON.parse(requestBody);
      } catch {
        requestBody = {};
      }
    }

    const data = ContactSchema.parse(normalizeContactBody(requestBody));

    const payload = {
      name: sanitize(data.name),
      email: sanitize(data.email),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
      receivedAt: new Date().toISOString(),
    };

    const GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error('SERVER_ERROR: VITE_GOOGLE_SCRIPT_URL is not set');
      throw new Error('Internal Configuration Error');
    }

    const formBody = new URLSearchParams();
    formBody.append('Name', payload.name);
    formBody.append('Email', payload.email);
    formBody.append('Subject', payload.subject);
    formBody.append('Message', payload.message);

    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!googleResponse.ok) {
      const text = await googleResponse.text();
      console.error('Google Sheets error:', text);
      throw new Error('Google Sheets request failed');
    }

    console.log('contact_submission forwarded successfully', { email: payload.email });
    return res.status(200).json({ ok: true });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors?.[0]?.message || 'Invalid input' });
    }
    console.error('contact_submission failed', err?.message);
    return res.status(502).json({
      error: 'Unable to submit right now. Please try again in a moment.',
    });
  }
}
