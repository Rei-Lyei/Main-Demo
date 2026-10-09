// Optional coturn relay. Set TURN_URLS (JSON array) and TURN_SHARED_SECRET in
// Supabase Edge Function secrets. Keep the shared secret off the browser.
import { createClient } from 'npm:@supabase/supabase-js@2.117.3';
const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Content-Type': 'application/json' };
Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const auth = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);
  const { data, error } = await auth.auth.getUser(token);
  if (error || !data.user) return new Response(JSON.stringify({ error: 'Sign in first' }), { status: 401, headers });
  const secret = Deno.env.get('TURN_SHARED_SECRET'), raw = Deno.env.get('TURN_URLS');
  if (!secret || !raw) return new Response(JSON.stringify({ error: 'The network relay has not been configured by the project owner.' }), { status: 503, headers });
  try {
    const urls = JSON.parse(raw);
    if (!Array.isArray(urls) || !urls.length || !urls.every(u => typeof u === 'string' && /^turns?:/.test(u))) throw new Error('Invalid relay URLs');
    const ttl = 21600, username = `${Math.floor(Date.now() / 1000) + ttl}:${data.user.id}`;
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(username)));
    const credential = btoa(String.fromCharCode(...signature));
    return new Response(JSON.stringify({ iceServers: [{ urls, username, credential }], ttl }), { headers });
  } catch {
    return new Response(JSON.stringify({ error: 'Relay configuration is invalid.' }), { status: 503, headers });
  }
});
