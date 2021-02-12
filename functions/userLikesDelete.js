const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { userId: user_id, canvasId: canvas_id } = JSON.parse(event.body)

  const response = await supabase
    .from('users_likes')
    .delete()
    .match({ user_id, canvas_id })
    .then(res => { 
      if (res.error)
        throw { error: res.error.message }
      else if (res.data.length === 0)
        throw { error: `row with values user_id: ${user_id} and canvas_id: ${canvas_id} does not exist.` }
      return {
        statusCode: 200,
        body: JSON.stringify(res.data[0])
      }
    })
    .catch(err => {
      console.log(err)
      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    })

  return response
}