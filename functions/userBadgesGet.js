const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { userId } = JSON.parse(event.body)

  const data = await supabase
    .from('users_badges')
    .select('*', { count: 'exact' })
    .eq('user_id', userId) // Gets a user's badges
    .then(res => { 
      if (res.error) throw { error: res.error.message }
      return res
    })
    .catch(err => err)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}