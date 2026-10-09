const SUPABASE_URL = "https://wrnkilgtuhprfxoqlzqq.supabase.co";
const SUPABASE_KEY = "sb_publishable_yZ7eDKVzRclRmXBgrsskqw_LLCsiQP0";

const { createClient } = supabase;

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase connected!");