// Browser-safe settings. Never put provider API secrets or Supabase service keys here.
window.VIRALHUB_LIVE = {
  maxViewers: 8,
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  // Optional authenticated Supabase Edge Function returning short-lived TURN credentials.
  // Deploy supabase/turn-credentials.ts and configure its server-side secrets first.
  turnFunction: null
};
