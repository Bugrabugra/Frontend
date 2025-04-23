import { createClient } from "@supabase/supabase-js";
import type { Database } from "../database.types";

const SUPABASE_URL = "https://xsmxougsdrwtlgazgleq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzbXhvdWdzZHJ3dGxnYXpnbGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTc1OTIsImV4cCI6MjA2MDk5MzU5Mn0.cLBropGfU8rk8GlRqyZCvCyfH2ZxBWH5GMBAoNIhf8k";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
