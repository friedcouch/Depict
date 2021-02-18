const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { canvasId, userId } = JSON.parse(event.body)

  const data = await supabase
    .from('canvasses')
    .select('canvas_id, name, image, like_count, user:user_id ( user_id, username )')
    .eq(canvasId ? 'canvas_id' : '', canvasId) // Filter to get a user's canvasses if userId is specified
    .eq(userId ? 'user_id' : '', userId) // Filter to get a user's canvasses if userId is specified
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