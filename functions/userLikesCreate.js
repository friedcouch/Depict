const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { userId: user_id, canvasId: canvas_id } = JSON.parse(event.body)

  const userExists = supabase
    .from('users')
    .select('user_id')
    .eq('user_id', user_id)
    .then(res => res.data.length !== 0)

  const canvasExists = supabase
    .from('canvasses')
    .select('canvas_id')
    .eq('canvas_id', canvas_id)
    .then(res => res.data.length !== 0)

  const errorMessage = await Promise.all([userExists, canvasExists])
    .then(data => {
      err = ''
      err = !data[0] ? err + `user with user_id: ${user_id} does not exist` : ''
      err = !data[1] ? err + `${!data[0] ? '\n' : ''}canvas with canvas_id: ${canvas_id} does not exist` : ''
      return err
    })

  if (errorMessage != '')
    return {
      statusCode: 404,
      body: JSON.stringify({ error: errorMessage })
    }

  const data = await supabase
    .from('users_likes')
    .insert({ user_id, canvas_id })
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