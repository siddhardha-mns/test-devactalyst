/* eslint-env node */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const cookieName = 'devcatalyst_admin';
const sessionHours = 12;
const getCookies = (value = '') => Object.fromEntries(value.split(';').map((item) => item.trim().split(/=(.*)/s, 2)).filter(([key]) => key));
const encode = (value) => Buffer.from(value).toString('base64url');
const sign = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');
const isEqual = (left, right) => { const a = Buffer.from(left); const b = Buffer.from(right); return a.length === b.length && timingSafeEqual(a, b); };
const isValidSession = (token, secret) => { if (!token || !secret) return false; const [payload, signature] = token.split('.'); if (!payload || !signature || !isEqual(signature, sign(payload, secret))) return false; try { return JSON.parse(Buffer.from(payload, 'base64url').toString()).expiresAt > Date.now(); } catch { return false; } };
const setSession = (res, token, maxAge = sessionHours * 60 * 60) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict${secure}; Max-Age=${maxAge}`);
};

export function isAdminRequest(req) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(secret && isValidSession(getCookies(req.headers.cookie)[cookieName], secret));
}

export default function handler(req, res) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return res.status(503).json({ error: 'Admin authentication is not configured.' });
  const token = getCookies(req.headers.cookie)[cookieName];
  if (req.method === 'GET') return isValidSession(token, secret) ? res.status(200).json({ authenticated: true }) : res.status(401).json({ authenticated: false });
  if (req.method === 'DELETE') { setSession(res, '', 0); return res.status(204).end(); }
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST, DELETE'); return res.status(405).json({ error: 'Method not allowed.' }); }
  const submitted = String(req.body?.password ?? '');
  if (!isEqual(submitted, password)) return res.status(401).json({ error: 'Invalid password.' });
  const payload = encode(JSON.stringify({ issuedAt: Date.now(), expiresAt: Date.now() + sessionHours * 60 * 60 * 1000, nonce: randomBytes(16).toString('hex') }));
  setSession(res, `${payload}.${sign(payload, secret)}`);
  return res.status(200).json({ authenticated: true });
}
