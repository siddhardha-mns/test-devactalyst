import { describe, it, expect } from 'vitest';

// Mirror the sanitize logic from api/contact.js for unit testing
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

const sanitize = (s: string) =>
  String(s)
    .replace(/\0/g, '')
    .replace(/[&<>"'`=/]/g, (m) => HTML_ESCAPE_MAP[m] ?? m);

describe('sanitize', () => {
  it('escapes HTML entities', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;',
    );
  });

  it('strips null bytes', () => {
    expect(sanitize('hello\0world')).toBe('helloworld');
  });

  it('escapes ampersands', () => {
    expect(sanitize('foo & bar')).toBe('foo &amp; bar');
  });

  it('leaves safe strings unchanged', () => {
    expect(sanitize('Hello World 123')).toBe('Hello World 123');
  });
});
