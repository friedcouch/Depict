const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { userId: user_id, badgeId: badge_id } = JSON.parse(event.body)

  const userExists = supabase
    .from('users')
    .select('user_id')
    .eq('user_id', user_id)
    .then(res => res.data.length !== 0)

  const badgeExists = supabase
    .from('badges')
    .select('badge_id')
    .eq('badge_id', badge_id)
    .then(res => res.data.length !== 0)

  const errorMessage = await Promise.all([userExists, badgeExists])
    .then(data => {
      err = ''
      err = !data[0] ? err + `user with user_id: ${user_id} does not exist` : ''
      err = !data[1] ? err + `${!data[0] ? '\n' : ''}badge with badge_id: ${badge_id} does not exist` : ''
      return err
    })

  if (errorMessage != '')
    return {
      statusCode: 400,
      body: JSON.stringify({ error: errorMessage })
    }

  const data = await supabase
    .from('users_badges')
    .insert({ user_id, badge_id })
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