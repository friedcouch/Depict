const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { canvasId } = JSON.parse(event.body)

  // Deconstruct data to get currentLikeCount
  const canvas = await supabase
    .from('canvasses')
    .select('like_count')
    .eq('canvas_id', canvasId)
    .then(res => res.data[0])

  if (!canvas) // canvasId supplied does not exist
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `canvas with canvas_id: ${canvasId} not found`})
    }

  const data = await supabase
    .from('canvasses')
    .update({ like_count: canvas.like_count + 1 })
    .eq('canvas_id', canvasId)
    .then(res => {
      if (res.error) throw { error: res.error.message }
      return res.data[0]
    })
    .catch(err => err)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}