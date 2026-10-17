// Posts a form to /api/enquiry. Resolves to { ok: true } or { ok: false, error }.
export async function submitEnquiry(kind, fields) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...fields }),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok ? { ok: true } : { ok: false, error: data.error || 'send_failed' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

// Builds a mailto link so visitors can still reach us if sending fails.
export function enquiryMailto(email, subject, lines) {
  const body = lines.filter(Boolean).join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
