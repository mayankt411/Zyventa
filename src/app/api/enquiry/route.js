import { NextResponse } from 'next/server';

// Receives contact, product and newsletter submissions and emails them to the
// Zyventa inbox through Resend (https://resend.com). Configure with:
//   RESEND_API_KEY  - required; without it the endpoint returns 503
//   ENQUIRY_TO      - inbox that receives enquiries (default contact@zyventa.com)
//   ENQUIRY_FROM    - verified sender, e.g. "Zyventa Website <web@zyventa.com>"

const KINDS = {
  contact: 'Website enquiry',
  product: 'Product enquiry',
  newsletter: 'Newsletter sign-up',
};

const LIMITS = { name: 120, email: 200, phone: 40, subject: 120, message: 5000, product: 120, quantity: 12 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot field: real visitors never fill it in.
  if (body.website) return NextResponse.json({ ok: true });

  const kind = KINDS[body.kind] ? body.kind : null;
  const email = String(body.email || '').trim();
  if (!kind || !EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }
  if (kind !== 'newsletter' && !String(body.name || '').trim()) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }
  if (kind === 'contact' && !String(body.message || '').trim()) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const fields = Object.keys(LIMITS)
    .map((key) => [key, String(body[key] ?? '').trim().slice(0, LIMITS[key])])
    .filter(([, value]) => value);

  const subjectParts = [KINDS[kind], body.product, body.subject].filter(Boolean).map((s) => String(s).slice(0, 120));
  const html =
    `<h2>${escapeHtml(KINDS[kind])}</h2><table cellpadding="6">` +
    fields
      .map(([k, v]) => `<tr><td valign="top"><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('') +
    '</table>';
  const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || 'Zyventa Website <onboarding@resend.dev>',
        to: [process.env.ENQUIRY_TO || 'contact@zyventa.com'],
        reply_to: email,
        subject: subjectParts.join(' · '),
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error('Enquiry email failed', res.status, await res.text());
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('Enquiry email failed', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
