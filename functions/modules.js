const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_KEY
exports.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)