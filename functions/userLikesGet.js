const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { userId, canvasId } = JSON.parse(event.body)

  const data = await supabase
    .from('users_likes')
    .select('*', { count: 'exact' })
    .eq(userId ? 'user_id' : '', userId) // Get a user's canvasses if userId is specified
    .eq(canvasId ? 'canvas_id' : '', canvasId) // Get users who liked the canvas with specified canvasId
    .then(res => { 
      if (res.error) throw { error: res.error.message }
      return res.data
    })
    .catch(err => err)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}