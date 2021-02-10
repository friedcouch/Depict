const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body)
  
  const data = await supabase.auth
    .signIn({ email, password })
    .then(res => {
      if (res.error) throw { error: res.error.message }
      return supabase
        .from('users')
        .select('*')
        .eq('uuid', res.user.id) // res.user.id is the UUID in auth.users
    })
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